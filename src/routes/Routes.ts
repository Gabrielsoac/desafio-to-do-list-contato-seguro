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
import { CreateUserDataValidation } from '../middleware/user/CreateUserDataValidation';
import { FindUserByIdDataValidation } from '../middleware/user/FindUserByIdDataValidation';
import { UpdateUserByIdDataValidation } from '../middleware/user/UpdateUserDataValidation';
import { DeleteUserByIdDataValidation } from '../middleware/user/DeleteUserDataValidation';
import { CreateTaskDataValidation } from '../middleware/task/CreateTaskDataValidation';
import { DeleteTaskDataValidation } from '../middleware/task/DeleteTaskDataValidation';
import { UpdateTaskByIdDataValidation } from '../middleware/task/UpdateTaskDataValidation';

const routes = Router();

routes.get(
    '/health',
    cors(healthCors),
    healthCheck
);

routes.post('/user', CreateUserDataValidation, CreateUserController);
routes.get('/user/:id', FindUserByIdDataValidation, GetUserByIdController);
routes.get('/user', GetUsersController);
routes.put('/user/:id', UpdateUserByIdDataValidation, UpdateUserController);
routes.delete('/user/:id', DeleteUserByIdDataValidation, DeleteUserController);


routes.post('/task', CreateTaskDataValidation, CreateTaskController);
routes.get('/task', FindAllTasksController);
routes.delete('/task/:id', DeleteTaskDataValidation, DeleteTaskController);
routes.put('/task/:id', UpdateTaskByIdDataValidation, UpdateTaskController);

export { routes }