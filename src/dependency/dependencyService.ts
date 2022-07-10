import { RequestHandler } from 'express';
import Axios from 'axios'
import { NPMPackage } from '../types';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
const getDependency = async (name: string, version: string): Promise<NPMPackage> => {
    const { data } = await Axios.get(`https://registry.npmjs.org/${name}/${version}`)

    console.debug(`Received ${data} from registry.npmjs.org`)
    return data
}
    
    
export { getDependency }