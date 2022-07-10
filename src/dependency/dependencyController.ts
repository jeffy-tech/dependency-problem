import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Dependency } from "./dependency";
  import { getDependency } from "./dependencyService"
import { NPMPackage } from "../types";
  
  @Route("dependency")
  export class DependencyController extends Controller {
    @Get("/{name}/{version}")
    public async getDependency(
      @Path() name: string,
      @Path() version: string
    ): Promise<NPMPackage> {
      return getDependency(name, version);
    }
  }