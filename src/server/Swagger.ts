import swaggerAutogen from 'swagger-autogen';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/*.ts'];
const PORT = process.env.PORT;

export const genSwaggerDoc = () => {
  swaggerAutogen(outputFile, endpointsFiles);
}

export const setUpSwagger = async (server: Express) => {
  
  genSwaggerDoc();

  const swaggerDocument = await import(outputFile);

  server.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.default));
    
    console.log(`Documentação com swagger disponível em: http://localhost:${PORT}/api-docs`);
}