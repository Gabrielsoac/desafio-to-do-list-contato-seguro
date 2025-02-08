import express from "express";
import { routes } from "../routes/Routes";
import { setupSwagger } from "./swagger";

const server = express();

server.use(express.json());
server.use(routes);
setupSwagger(server);

export { server };
