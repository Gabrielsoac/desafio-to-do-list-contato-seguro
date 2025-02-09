import * as yup from 'yup'
import { validation } from '../Validation';
import { TFindTaskById } from '../../../domain/usecases/task/delete/TFindTaskById';

const paramsValidation: yup.ObjectSchema<TFindTaskById> =
    yup.object().shape(
        {
            id: yup.string().required().min(1)
        }
    );

const fields = {
    params: paramsValidation,
}

export const DeleteTaskDataValidation = validation(fields);