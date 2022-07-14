import Axios from 'axios';
import _ from 'lodash'
import { NPMPackage, NPMPackageComparison, NPMPackageParams } from '../types';

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
 */
const compareDependencies = (pkg, sibling) => {
  const otherKeys = Object.keys(sibling.dependencies!!)

  return _.map(otherKeys, (key) => {
    const primaryDependencyValue = _.get(pkg.dependencies!!, key)
    const siblingDependencyValue = _.get(sibling.dependencies!!, key)
    console.log({key, primary, sibling: _.get(sibling.dependencies!!, key)})
  })
}

const getDependencyDifferences = async (name: string, version: string, otherPackages?: Array<NPMPackageParams>): Promise<NPMPackageComparison> => {
  const dependencyDifferences: Array<unknown> = []

  const npmPackage = getDependency(name, version)
  const otherNpmPackages = _.map(otherPackages, ({ name, version }) => getDependency(name, version))
  
  return Promise.all([npmPackage, ...otherNpmPackages]).then((res) => {
    const [primary, others] = [_.first(res), res.splice(1, res.length)]

    const results = _.map(others, (sibling) => {
      compareDependencies(primary, sibling)
    })
    // const primaryDeps = Object.keys(first.dependencies!!)
    // _.map(Object.keys(others.dependencies), (dependentKey) => {
    //   if (primaryDeps.includes(dependentKey)) {
    //     const primarySemver = first.dependencies[dependentKey]
    //   }
    // })

    return { ...primary, ...{ dependencyDifferences} }
  })
}
  
export { getDependency, getDependencyDifferences };
