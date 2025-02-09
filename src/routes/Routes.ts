import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { GetUserByIdController } from '../controllers/user/GetUserByIdController';
import { GetUsersController } from '../controllers/user/GetUsersController';
import { UpdateUserController } from '../controllers/user/UpdateUserController';
import { DeleteUserController } from '../controllers/user/DeleteUserController';
import { FindAllTasksController } from '../controllers/task/FindAllTasksController';
import { UpdateTaskController } from '../controllers/task/UpdateTaskController';
import { DeleteTaskController } from '../controllers/task/DeleteTaskController';
import { CreateUserDataValidation } from '../infra/middleware/user/CreateUserDataValidation';
import { FindUserByIdDataValidation } from '../infra/middleware/user/FindUserByIdDataValidation';
import { UpdateUserByIdDataValidation } from '../infra/middleware/user/UpdateUserDataValidation';
import { DeleteUserByIdDataValidation } from '../infra/middleware/user/DeleteUserDataValidation';
import { CreateTaskDataValidation } from '../infra/middleware/task/CreateTaskDataValidation';
import { DeleteTaskDataValidation } from '../infra/middleware/task/DeleteTaskDataValidation';
import { UpdateTaskByIdDataValidation } from '../infra/middleware/task/UpdateTaskDataValidation';
import { FindAllTasksByUserController } from '../controllers/task/FindAllTasksByUserController';

const routes = Router();

routes.get(
    '/health',
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
routes.get('/task/user/:id', FindUserByIdDataValidation, FindAllTasksByUserController);

export { routes }