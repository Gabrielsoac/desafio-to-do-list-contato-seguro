import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação API Tasks - Contato Seguro',
      version: '1.0.0',
      description: 'DOCUMENTAÇÃO CRIADA COM SWAGGER PARA API DE TASK PARA VAGA DA CONTATO SEGURO ',
    },
  },
  apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger disponível em http://localhost:3000/api-docs');
}
