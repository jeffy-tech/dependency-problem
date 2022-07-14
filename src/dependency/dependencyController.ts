import _ from "lodash"
import { Body, Controller, Get, Path, Post, Query, Route } from 'tsoa';
import { getDependency, getDependencyDifferences } from './dependencyService';
import { NPMPackage, NPMPackageComparison, NPMPackageParams } from '../types';

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

  @Post('/{name}/{version}')
  public async getDependencyMismatches(@Path() name: string, @Path() version: string, @Body() otherPackages?: Array<NPMPackageParams>): Promise<NPMPackage | NPMPackageComparison | unknown> {
    try {
      const data = _.isEmpty(otherPackages) ? await getDependency(name, version) : await getDependencyDifferences(name, version, otherPackages);
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
