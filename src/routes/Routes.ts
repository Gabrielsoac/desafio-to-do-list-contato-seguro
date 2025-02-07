import { Router } from 'express';
import { healthCheck, healthCors } from '../controllers/healthController';
import  cors  from 'cors';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { CreateUserController } from '../controllers/user/CreateUserController';

const routes = Router();

routes.get(
    '/health',
    cors(healthCors),
    healthCheck
);

routes.post('/user', CreateUserController);
routes.post('/task', CreateTaskController);

export { routes }