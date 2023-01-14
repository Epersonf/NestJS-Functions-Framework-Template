import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import express from "express";

const server: express.Express = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );
  app.enableCors();
  return app.init();
};

createNestServer(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export { server as main };
