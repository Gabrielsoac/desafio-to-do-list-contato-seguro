import express from "express";
import { routes } from "../routes/Routes";
import { setupSwagger } from "./swagger";
import { ResponseError } from "../middleware/responseErrors/ResponseErrors";

const server = express();

server.use(express.json());
server.use(routes);
server.use(ResponseError);
setupSwagger(server);

export { server };
