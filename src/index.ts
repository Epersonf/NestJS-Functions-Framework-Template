import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import express, { Express } from 'express';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

const server: Express = express();

async function createNestServer(expressInstance: Express) {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );
  app.enableCors();
  return app.init();
}

const serverStartPromise = createNestServer(server);

server.use(async (_req, _res, next) => {
  await serverStartPromise;
  next();
});

export { server as main };
