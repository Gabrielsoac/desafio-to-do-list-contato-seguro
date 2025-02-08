import * as yup from 'yup'
import { validation } from '../Validation';
import { TCreateUserRequestDto } from '../../usecases/user/create/TCreateUserRequestDto';
import { TFindUserRequestDto } from '../../usecases/user/findOne/TFindUserRequest';

const bodyValidation: yup.ObjectSchema<TCreateUserRequestDto> =
    yup.object().shape(
        {
            name: yup.string().required().min(2),
            email: yup.string().required().email().min(3),
            password: yup.string()
                .required()
                .min(8, 'A nova senha precisa ser pelo menos 8 caracteres')
                .matches(/[A-Z]/, 'A nova senha precisa ter pelo menos 1 caractere maiúsculo')
                .matches(/[a-z]/, 'A nova senha precisa ter pelo menos 1 caractere minúsculo')
                .matches(/\d/, 'A nova senha deve conter pelo menos 1 número')
                .matches(/[@$!%*?&#]/, 'A nova senha deve conter pelo menos um caractere especial')
        }
    );

const paramsValidation: yup.ObjectSchema<TFindUserRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required(),
        }
    );

const fields = {
    body: bodyValidation,
    params: paramsValidation
}

export const UpdateUserByIdDataValidation = validation(fields);