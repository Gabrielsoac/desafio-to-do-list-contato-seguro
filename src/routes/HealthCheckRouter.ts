import { Router } from 'express';
import cors from 'cors';
import { healthCheck } from '../controllers/healthController';
import { HealthCors } from '../controllers/cors/health/HealthCors';

const HealthCheckRoutes = Router();

HealthCheckRoutes.get(
    '/health',
    cors(HealthCors),
    healthCheck

    // #swagger.auto = false
    /*  
        #swagger.path = '/health'
        #swagger.method = 'get'
        #swagger.produces = ['application/json']
        #swagger.summary = 'Health Check'
        #swagger.description = 'Endpoint para verificar a saúde da aplicação com Docker Compose.'
        #swagger.responses[200] = {
        description: 'Aplicação está saudável'
        }
    */
);
  
  export { HealthCheckRoutes }
  