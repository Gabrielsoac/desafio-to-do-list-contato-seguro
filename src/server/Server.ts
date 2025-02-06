import express from "express";
import { routes } from "../routes/Routes";

const server = express();

server.use(express.json());
server.use(routes);

export { server };
