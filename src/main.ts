import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import serverlessExpress from "@vendia/serverless-express";

import { AppModule } from './app.module';

// const port = process.env.PORT || 4000;

let server

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });

  // await app.listen(port);
}
// bootstrap().then(() => {
//   console.log('App is running on %s port', port);
// });


export const handler = async (event: any, context: any, callback: any,) => {
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
