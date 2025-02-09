import { Router } from 'express';

import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { FindAllTasksController } from '../controllers/task/FindAllTasksController';
import { UpdateTaskController } from '../controllers/task/UpdateTaskController';
import { DeleteTaskController } from '../controllers/task/DeleteTaskController';
import { FindUserByIdDataValidation } from '../infra/middleware/user/FindUserByIdDataValidation';
import { CreateTaskDataValidation } from '../infra/middleware/task/CreateTaskDataValidation';
import { DeleteTaskDataValidation } from '../infra/middleware/task/DeleteTaskDataValidation';
import { UpdateTaskByIdDataValidation } from '../infra/middleware/task/UpdateTaskDataValidation';
import { FindAllTasksByUserController } from '../controllers/task/FindAllTasksByUserController';

const TaskRoutes = Router();

TaskRoutes.post('/task', CreateTaskDataValidation, CreateTaskController);
TaskRoutes.get('/task', FindAllTasksController);
TaskRoutes.delete('/task/:id', DeleteTaskDataValidation, DeleteTaskController);
TaskRoutes.put('/task/:id', UpdateTaskByIdDataValidation, UpdateTaskController);
TaskRoutes.get('/task/user/:id', FindUserByIdDataValidation, FindAllTasksByUserController);

export { TaskRoutes }