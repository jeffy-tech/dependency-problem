import express, { Response, Request }  from 'express';
import bodyParser from "body-parser";
import { RegisterRoutes } from "./tsoa-generated/routes";
import swaggerUi from "swagger-ui-express";


export const app = express();

export const createApp = () => {
  app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import("./tsoa-generated/swagger.json"))
    );
  });

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())

  RegisterRoutes(app)

  return app
}




