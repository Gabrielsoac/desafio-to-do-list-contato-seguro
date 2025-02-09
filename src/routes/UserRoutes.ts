import { Router } from 'express';
import { CreateUserDataValidation } from '../infra/middleware/user/CreateUserDataValidation';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { FindUserByIdDataValidation } from '../infra/middleware/user/FindUserByIdDataValidation';
import { GetUserByIdController } from '../controllers/user/GetUserByIdController';
import { GetUsersController } from '../controllers/user/GetUsersController';
import { UpdateUserByIdDataValidation } from '../infra/middleware/user/UpdateUserDataValidation';
import { UpdateUserController } from '../controllers/user/UpdateUserController';
import { DeleteUserByIdDataValidation } from '../infra/middleware/user/DeleteUserDataValidation';
import { DeleteUserController } from '../controllers/user/DeleteUserController';

const UserRoutes = Router();

UserRoutes.post('/user', CreateUserDataValidation, CreateUserController);
UserRoutes.get('/user/:id', FindUserByIdDataValidation, GetUserByIdController);
UserRoutes.get('/user', GetUsersController);
UserRoutes.put('/user/:id', UpdateUserByIdDataValidation, UpdateUserController);
UserRoutes.delete('/user/:id', DeleteUserByIdDataValidation, DeleteUserController);

export { UserRoutes }