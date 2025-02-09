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

TaskRoutes.post(
    '/task',
    CreateTaskDataValidation,
    CreateTaskController

    // Documentação com Swagger API 2.0
    // Cria uma Task
    // A Task precisa ter título e userId
    // A descrição é opcional, caso não seja enviada, é retornado como uma string vazia

    // O retorno contém
    /*
        id
        title
        description
        userId
        status (padrão pending)
        createdAt
        updatedAt
    */

    // #swagger.auto = true
/*  
    #swagger.path = '/task'
    #swagger.method = 'post'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.summary = 'Criação de Tarefa'
    #swagger.description = 'Endpoint para criar uma nova tarefa: 
    Sobre os dados:
    - title é obrigatório
    - description é optional, caso não seja informado, será retornado como uma string vazia
    - user recebe o ID do usuário no padrão do mongodb com 24 caracterers'

    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
            type: 'object',
            required: ['title', 'user'],
            properties: {
                title: { 
                    type: 'string', 
                    description: 'O título da tarefa. Este campo é obrigatório.', 
                    example: 'Dormir' 
                },
                description: { 
                    type: 'string', 
                    description: 'A descrição da tarefa. Este campo é opcional e será uma string vazia se não for fornecido.', 
                    example: 'Dormir 22:30 todos os dias' 
                },
                user: { 
                    type: 'string', 
                    description: 'O ID do usuário. Deve ser uma string de 24 caracteres.', 
                    minLength: 24, 
                    maxLength: 24, 
                    example: '67a80a413605da57c732366d' 
                }
            }
        }
    }

    #swagger.responses[201] = {
        description: 'Tarefa criada com sucesso',
        schema: {
            id: '67a8ea014f6913d2bef8ea81',
            title: 'Dormir',
            description: 'Dormir 22:30 todos os dias',
            status: 'pending',
            userID: '67a80a413605da57c732366d',
            createdAt: '09 de fevereiro de 2025 às 14:46:41',
            updatedAt: '09 de fevereiro de 2025 às 14:46:41'
        },
        headers: {
            location: {
                description: 'URI do novo recurso criado',
                schema: {
                    type: 'string',
                    example: '/task/67a8ea014f6913d2bef8ea81'
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: 'Usuário não encontrado',
        schema: {
            statusCode: 400,
            message: 'User not found'
        }
    }
*/
);


TaskRoutes.get(
    '/task',
    FindAllTasksController

    //Documentação com Swagger 2.0
    // Retorna todas as tasks criadas, de todos os usuários

     // #swagger.auto = false
    /*
    #swagger.path = '/task'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Listar Tarefas'
    #swagger.description = 'Endpoint para listar todas as tarefas criadas. Retorna um 200 OK se bem-sucedido ou um 500 Internal Server Error em caso de falha.'
    
    #swagger.responses[200] = {
        description: 'Tarefas listadas com sucesso',
        schema: {
            tasks: [
                {
                    id: '67a8af9aa432783b8f0c680b',
                    title: 'Fazer exercícios',
                    description: 'Caminhada de 30 minutos',
                    status: 'completed',
                    userID: '67a80a413605da57c732366d',
                    createdAt: '09 de fevereiro de 2025 às 10:37:30',
                    updatedAt: '09 de fevereiro de 2025 às 10:37:30'
                }
            ]
        }
    }
    
    #swagger.responses[500] = {
        description: 'Erro interno do servidor',
        schema: {
            code: 500,
            message: 'INTERNAL SERVER ERROR'
        }
    }
*/
)


TaskRoutes.delete(
    '/task/:id',
    DeleteTaskDataValidation,
    DeleteTaskController

    //Documentação com Swagger 2.0
    //Deleta uma task pelo ID
    
    // #swagger.auto = false

    /*  
    #swagger.path = '/task/{id}'
    #swagger.method = 'delete'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Exclusão de Task'
    #swagger.description = 'Endpoint para excluir uma task específica pelo ID.'

    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        minLength: 24,
        maxLength: 24,
        description: 'O ID da task a ser excluída.'
    }

    #swagger.responses[200] = {
        description: 'Task excluída com sucesso'
    }

    #swagger.responses[404] = {
        description: 'Task não encontrada',
        schema: {
            code: 404,
            message: 'Task não encontrada'
        }
    }

    #swagger.responses[500] = {
        description: 'Erro interno no servidor',
        schema: {
            code: 500,
            message: 'INTERNAL SERVER ERROR'
        }
    }
*/
);

TaskRoutes.put(
    '/task/:id',
    UpdateTaskByIdDataValidation,
    UpdateTaskController

    //Documentação com Swagger 2.0
    // A Task precisa ter título, userId e status
    // A descrição é opcional, caso não seja enviada, é retornado como uma string vazia
    // o status é um enum: pending, in_progress ou completed

    // O retorno contém
    /*
        id
        title
        description
        userId
        status (padrão pending)
        createdAt
        updatedAt
    */

    // #swagger.auto = false
    /*
    #swagger.path = '/task/{id}'
      #swagger.method = 'put'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
      #swagger.summary = 'Atualização de Task'
      #swagger.description = 'Endpoint para atualizar uma task específica pelo ID.'

      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          minLength: 24,
          maxLength: 24,
          description: 'O ID da task a ser atualizada.'
      }

      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          '@schema': {
              type: 'object',
              properties: {
                  title: {
                      type: 'string',
                      description: 'O novo título da task.',
                      example: 'Jogar bola'
                  },
                  description: {
                      type: 'string',
                      description: 'A nova descrição da task. Este campo é opcional e será uma string vazia se não for fornecido.',
                      example: 'Com os amigos'
                  },
                  status: {
                      type: 'string',
                      description: 'O novo status da task (pending, in_progress, completed).',
                      example: 'in_progress'
                  }
              }
          }
      }

      #swagger.responses[200] = {
          description: 'Task atualizada com sucesso',
          schema: {
              id: '67a8ac8b31f335f784a9429b',
              title: 'Jogar bola',
              description: 'Com os amigos',
              status: 'in_progress',
              userID: '67a80a413605da57c732366d',
              createdAt: '09 de fevereiro de 2025 às 10:24:27',
              updatedAt: '09 de fevereiro de 2025 às 10:37:42'
          }
      }

      #swagger.responses[404] = {
          description: 'Task não encontrada',
          schema: {
              code: 404,
              message: 'Task não encontrada'
          }
      }

      #swagger.responses[500] = {
          description: 'Erro interno no servidor',
          schema: {
              code: 500,
              message: 'INTERNAL SERVER ERROR'
          }
      }
  */
);

TaskRoutes.get(
    '/task/user/:id',
    FindUserByIdDataValidation,
    FindAllTasksByUserController

    //Documentação com Swagger 2.0
    //Retorna todas as tasks de um usuário recebido via params

    // #swagger.auto = false
    /*  
#swagger.path = '/task/user/{id}'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Listagem de Tasks por Usuário'
    #swagger.description = 'Endpoint para listar todas as tasks de um usuário específico pelo ID do usuário.'

    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        minLength: 24,
        maxLength: 24,
        description: 'O ID do usuário cujas tasks serão listadas.'
    }

    #swagger.responses[200] = {
        description: 'Tasks do usuário listadas com sucesso',
        schema: {
            tasks: [
                {
                    id: '67a8f686cb56b17a95994842',
                    title: 'Dormir',
                    description: 'Dormir 22:30 todos os dias',
                    status: 'pending',
                    userID: '67a8f680cb56b17a95994840',
                    createdAt: '09 de fevereiro de 2025 às 15:40:06',
                    updatedAt: '09 de fevereiro de 2025 às 15:40:06'
                }
            ]
        }
    }

    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: {
            code: 404,
            message: 'usuário não encontrado'
        }
    }
*/
);

export { TaskRoutes }