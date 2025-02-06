import { Router } from 'express';
import { healthCheck, healthCors } from '../controllers/healthController';
import  cors  from 'cors';

const routes = Router();

routes.get(
    '/health',
    cors(healthCors),
    healthCheck
);

export { routes }