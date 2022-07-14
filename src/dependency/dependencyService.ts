import Axios from 'axios';
import _ from 'lodash'
import semverCompareRange from 'semver-compare-range'

import { DependencyMismatch, NPMPackage, NPMPackageComparison, NPMPackageParams } from '../types';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
const getDependency = async (name: string, version: string): Promise<NPMPackage> => {
  return Axios.get(`https://registry.npmjs.org/${name}/${version}`).then(({ data }) => {
    return <NPMPackage>data;
  });
};

/** 
 * Function will compare dependencies and returns an array
 * that will show mismatches
 * 
 * returns name, primaryVersion, siblingVersion when different
 */
const compareDependencies = (pkg, sibling): Array<DependencyMismatch> => {
  const otherKeys = Object.keys(sibling.dependencies!!)

  const differences = _.map(otherKeys, (key) => {
    const primaryDependencyValue = _.get(pkg.dependencies!!, key)
    const siblingDependencyValue = _.get(sibling.dependencies!!, key)

    const rangeComparison = semverCompareRange(primaryDependencyValue, siblingDependencyValue)
    switch (rangeComparison) {
      case 1:
      case -1:
        console.log({ key, primaryVersion: primaryDependencyValue, siblingVersion: siblingDependencyValue })
        return { name: key, primaryVersion: primaryDependencyValue, siblingVersion: siblingDependencyValue }
      default:
    }
  })

  return _.compact(differences)
}

const getDependencyDifferences = async (name: string, version: string, otherPackages?: Array<NPMPackageParams>): Promise<NPMPackageComparison> => {
  const dependencyDifferences: Array<unknown> = []

  const npmPackage = getDependency(name, version)
  const otherNpmPackages = _.map(otherPackages, ({ name, version }) => getDependency(name, version))

  return Promise.all([npmPackage, ...otherNpmPackages]).then((res) => {
    const [primary, others] = [_.first(res), res.splice(1, res.length)]

    const results = _.flattenDeep(_.map(others, (sibling) => compareDependencies(primary, sibling)))

    return { ...primary, ...{ dependencyDifferences: results } }
  })
}

export { getDependency, getDependencyDifferences };
