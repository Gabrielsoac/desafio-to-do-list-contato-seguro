import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';

const HealthCheckRoutes = Router();

HealthCheckRoutes.get(
    '/health',
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
  