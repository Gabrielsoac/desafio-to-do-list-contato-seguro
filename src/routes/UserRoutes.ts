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

UserRoutes.post(
    '/user',
    CreateUserDataValidation,
    CreateUserController

    // Todos os dados são necessários
    // A senha possui um regex e precisa:
        // 8 caracteres
        // 1 caractere maíúsculo e 1 minúsculos
        // 1 caractere especial
    // Um email por usuário
    // Não é retornado a senha

    // #swagger.auto = false

/*  
    #swagger.path = '/user'
    #swagger.method = 'post'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.summary = 'Criação de Usuário'
    #swagger.description = 'Endpoint para criar um novo usuário.'

    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: { 
                    type: 'string', 
                    description: 'O nome completo do usuário.', 
                    example: 'FULANO DE TAL' 
                },
                email: { 
                    type: 'string', 
                    format: 'email',
                    description: 'O endereço de email do usuário.', 
                    example: 'fuladodetal@gmail.com' 
                },
                password: { 
                    type: 'string', 
                    description: 'A senha do usuário. Precisa ter pelo menos 8 dígitos, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula.', 
                    minLength: 8,
                    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$',
                    example: 'Sa192921@' 
                }
            }
        }
    }

    #swagger.responses[201] = {
        description: 'Usuário criado com sucesso',
        schema: {
            id: '67a8faa79f0e98997b542dc2',
            name: 'FULANO DE TAL',
            email: 'fuladodetal@gmail.com'
        },
        headers: {
            location: {
                description: 'URL do novo recurso criado',
                schema: {
                    type: 'string',
                    example: '/user/67a8faa79f0e98997b542dc2'
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: 'Usuário com este email já existe',
        schema: {
            code: 400,
            message: 'Usuário com este email já existe'
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

UserRoutes.get(
    '/user/:id',
    FindUserByIdDataValidation,
    GetUserByIdController

    // Documentação com Swagger 2.0
    // Buscar usuário by id

    // #swagger.auto = false
/*  
    #swagger.path = '/user/{id}'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Obter Usuário'
    #swagger.description = 'Endpoint para obter detalhes de um usuário específico pelo ID.'

    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        minLength: 24,
        maxLength: 24,
        description: 'O ID do usuário cujos detalhes serão obtidos.'
    }

    #swagger.responses[200] = {
        description: 'Detalhes do usuário obtidos com sucesso',
        schema: {
            id: '67a8faa79f0e98997b542dc2',
            name: 'FULANO DE TAL',
            email: 'fuladodetal@gmail.com'
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

UserRoutes.get(
    '/user',
    GetUsersController

    // Documentação com Swagger 2.0
    // Busca todos os usuários

    // #swagger.auto = false
/*  
    #swagger.path = '/user'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Listagem de Usuários'
    #swagger.description = 'Endpoint para listar todos os usuários cadastrados.'

    #swagger.responses[200] = {
        description: 'Usuários listados com sucesso',
        schema: [
            {
                id: '67a91072118489d5e95ef2d7',
                name: 'Fulano da Silva',
                email: 'fulanodasilva@gmail.com'
            }
        ]
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


UserRoutes.put(
    '/user/:id',
    UpdateUserByIdDataValidation,
    UpdateUserController
   
    // Documentação com Swagger 2.0
    // Atualiza um usuário by id
    // Todos os dados são necessários
    // A senha possui um regex e precisa:
        // 8 caracteres
        // 1 caractere maíúsculo e 1 minúsculos
        // 1 caractere especial
    // Um email por usuário
    // Não é retornado a senha

    // #swagger.auto = false
/*  
    #swagger.path = '/user/{id}'
    #swagger.method = 'put'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.summary = 'Atualização de Usuário'
    #swagger.description = 'Endpoint para atualizar um usuário específico pelo ID.'

    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        minLength: 24,
        maxLength: 24,
        description: 'O ID do usuário a ser atualizado.'
    }

    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: { 
                    type: 'string', 
                    description: 'O nome completo do usuário.', 
                    example: 'Fulano da Silva' 
                },
                email: { 
                    type: 'string', 
                    format: 'email',
                    description: 'O endereço de email do usuário.', 
                    example: 'fulanoxyz@gmail.com' 
                },
                password: { 
                    type: 'string', 
                    description: 'A senha do usuário. Precisa ter pelo menos 8 dígitos, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula.', 
                    minLength: 8,
                    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$',
                    example: 'G12345653fsa@' 
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso',
        schema: {
            id: '67a91072118489d5e95ef2d7',
            name: 'Fulano da Silva',
            email: 'fulanoxyz@gmail.com'
        }
    }

    #swagger.responses[400] = {
        description: 'Usuário com este email já existe',
        schema: {
            code: 400,
            message: 'usuário com este email já existe'
        }
    }

    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: {
            code: 404,
            message: 'usuário não encontrado'
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

UserRoutes.delete(
    '/user/:id',
    DeleteUserByIdDataValidation,
    DeleteUserController

    // Documentação com Swagger 2.0
    // Deleta um usuário by id
    // Apaga todas as tasks desse usuário

    // #swagger.auto = false
/*  
    #swagger.path = '/user/{id}'
    #swagger.method = 'delete'
    #swagger.produces = ['application/json']
    #swagger.summary = 'Exclusão de Usuário'
    #swagger.description = 'Endpoint para excluir um usuário específico pelo ID.'

    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        minLength: 24,
        maxLength: 24,
        description: 'O ID do usuário a ser excluído.'
    }

    #swagger.responses[200] = {
        description: 'Usuário excluído com sucesso',
        schema: {
            code: 200,
            message: 'No Content'
        }
    }

    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: {
            code: 404,
            message: 'Usuário não encontrado'
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

export { UserRoutes }