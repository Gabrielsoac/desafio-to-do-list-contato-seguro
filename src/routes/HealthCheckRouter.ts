import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';

const HealthCheckRoutes = Router();

HealthCheckRoutes.get(
    '/health',
    healthCheck
);

export { HealthCheckRoutes }