import express from "express";
import { TaskRoutes } from "../routes/TaskRoutes";
import { setupSwagger } from "./swagger";
import { ResponseError } from "../infra/middleware/responseErrors/ResponseErrors";
import { HealthCheckRoutes } from "../routes/HealthCheckRouter";
import { UserRoutes } from "../routes/UserRoutes";

const server = express();

server.use(express.json());

server.use(TaskRoutes);
server.use(HealthCheckRoutes);
server.use(UserRoutes);

setupSwagger(server);

server.use(ResponseError);

export { server };
