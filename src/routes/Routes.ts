import { Router } from 'express';
import { healthCheck, healthCors } from '../controllers/healthController';
import  cors  from 'cors';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { GetUserByIdController } from '../controllers/user/GetUserByIdController';
import { GetUsersController } from '../controllers/user/GetUsersController';
import { UpdateUserController } from '../controllers/user/UpdateUserController';
import { DeleteUserController } from '../controllers/user/DeleteUserController';
import { FindAllTasksController } from '../controllers/task/FindAllTasksController';
import { UpdateTaskController } from '../controllers/task/UpdateTaskController';
import { DeleteTaskController } from '../controllers/task/DeleteTaskController';

const routes = Router();

routes.get(
    '/health',
    cors(healthCors),
    healthCheck
);

routes.post('/user', CreateUserController);
routes.get('/user/:id', GetUserByIdController);
routes.get('/user', GetUsersController);
routes.put('/user/:id', UpdateUserController);
routes.delete('/user/:id', DeleteUserController);


routes.post('/task', CreateTaskController);
routes.get('/task', FindAllTasksController);
routes.delete('/task/:id', DeleteTaskController);
routes.put('/task/:id', UpdateTaskController);

export { routes }