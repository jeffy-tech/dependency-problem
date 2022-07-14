import { Controller, Get, Path, Route } from 'tsoa';
import { getDependency } from './dependencyService';
import { NPMPackage } from '../types';

@Route('dependency')
export class DependencyController extends Controller {
  @Get('/{name}/{version}')
  public async getDependency(@Path() name: string, @Path() version: string): Promise<NPMPackage> {
    return getDependency(name, version);
  }
}
