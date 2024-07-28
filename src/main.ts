import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';

const expressApp = express();

const createNestServer = async (expressInstance: any) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  await app.init();
  return app.getHttpAdapter().getInstance();
};

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  if (!cachedServer) {
    cachedServer = await createNestServer(expressApp);
  }
  return cachedServer;
};

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const server = await bootstrapServer();

  return new Promise<APIGatewayProxyResult>((resolve, reject) => {
    const requestHandler = (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        const result: APIGatewayProxyResult = {
          statusCode: response.statusCode,
          headers: response.headers,
          body: response.body,
        };
        resolve(result);
      }
    };

    server.emit('request', event, context, requestHandler);
  });
};
