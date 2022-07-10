import { getDependency } from './dependency/dependencyService';
import express from 'express';
import bodyParser from "body-parser";
import { RegisterRoutes } from "./tsoa-generated/routes";

export const app = express();

export const createApp = () => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())

  RegisterRoutes(app)

  return app
}




