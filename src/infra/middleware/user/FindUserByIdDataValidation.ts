import * as yup from 'yup'
import { validation } from '../Validation';
import { TFindUserRequestDto } from '../../../controllers/user/userDtos/request/TFindUserRequest';

const paramsValidation: yup.ObjectSchema<TFindUserRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required().max(24).min(24),
        }
    );

const fields = {
    params: paramsValidation
}

export const FindUserByIdDataValidation = validation(fields);