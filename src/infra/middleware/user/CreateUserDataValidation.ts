import * as yup from 'yup'
import { TCreateUserRequestDto } from '../../../domain/usecases/user/create/TCreateUserRequestDto'
import { validation } from '../Validation';

const bodyValidation: yup.ObjectSchema<TCreateUserRequestDto> =
    yup.object().shape(
        {
            name: yup.string().required().min(2),
            email: yup.string().required().email().min(3),
            password:  yup.string()
            .required()
            .min(8, 'A senha precisa ser pelo menos 8 caracteres')
            .matches(/[A-Z]/, 'A senha precisa ter pelo menos 1 caractere maiúsculo')
            .matches(/[a-z]/, 'A senha precisa ter pelo menos 1 caractere minúsculo')
            .matches(/\d/, 'A senha deve conter pelo menos 1 número')
            .matches(/[@$!%*?&#]/, 'A senha deve conter pelo menos um caractere especial')
        }
    );

const fields = {
    body: bodyValidation,
}

export const CreateUserDataValidation = validation(fields);