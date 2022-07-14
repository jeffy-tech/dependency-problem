import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './tsoa-generated/routes';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./tsoa-generated/swagger.json')));
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

export default app;
