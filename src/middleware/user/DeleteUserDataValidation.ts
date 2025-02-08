import * as yup from 'yup'
import { validation } from '../Validation';
import { TFindUserRequestDto } from '../../usecases/user/findOne/TFindUserRequest';

const paramsValidation: yup.ObjectSchema<TFindUserRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required(),
        }
    );

const fields = {
    params: paramsValidation,
}

export const DeleteUserByIdDataValidation = validation(fields);