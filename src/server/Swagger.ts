import swaggerAutogen from 'swagger-autogen';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import 'dotenv/config';

const outputFile = path.resolve(__dirname, './swagger.json');
const endpointsFiles = ['./**/*.ts'];
const PORT = process.env.PORT || 3000;

export const genSwaggerDoc = async () => {
  await swaggerAutogen(outputFile, endpointsFiles);
}

export const setUpSwagger = async (server: Express) => {
  
  await genSwaggerDoc();

  const swaggerDocument = await import(outputFile);

  server.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.default));
    
    console.log(`Documentação com swagger disponível em: http://localhost:${PORT}/api-docs`);
}
