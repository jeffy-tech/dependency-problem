import { Controller, Get, Path, Route } from 'tsoa';
import { getDependency } from './dependencyService';
import { NPMPackage } from '../types';

@Route('dependency')
export class DependencyController extends Controller {
  @Get('/{name}/{version}')
  public async getDependency(@Path() name: string, @Path() version: string): Promise<NPMPackage | unknown> {
    try {
      const data = await getDependency(name, version);
      if (data) {
        this.setStatus(200);
        return data;
      }
      this.setStatus(404);
    } catch (err) {
      this.setStatus(500);
      return err;
    }
  }
}
