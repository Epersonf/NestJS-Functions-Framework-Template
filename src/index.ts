import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import express, { Express } from "express";

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

createNestServer(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export { server as main };
