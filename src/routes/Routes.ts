import { Router } from 'express';
import { healthCheck, healthCors } from '../controllers/healthController';
import  cors  from 'cors';
import { CreateTaskController } from '../controllers/task/CreateTaskController';

const routes = Router();

routes.get(
    '/health',
    cors(healthCors),
    healthCheck
);

routes.post('/task', CreateTaskController);

export { routes }