import Axios from 'axios';
import { NPMPackage } from '../types';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
const getDependency = async (name: string, version: string): Promise<NPMPackage> => {
  return Axios.get(`https://registry.npmjs.org/${name}/${version}`).then(({ data }) => {
    return <NPMPackage>data;
  });
};

export { getDependency };
