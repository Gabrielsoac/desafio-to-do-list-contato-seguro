import express from "express";
import { TaskRoutes } from "../routes/TaskRoutes";
import { ResponseError } from "../infra/middleware/responseErrors/ResponseErrors";
import { HealthCheckRoutes } from "../routes/HealthCheckRouter";
import { UserRoutes } from "../routes/UserRoutes";
import { setUpSwagger } from "./Swagger";

const server = express();

server.use(express.json());

server.use(TaskRoutes);
server.use(HealthCheckRoutes);
server.use(UserRoutes);
setUpSwagger(server);

server.use(ResponseError);

export { server };
