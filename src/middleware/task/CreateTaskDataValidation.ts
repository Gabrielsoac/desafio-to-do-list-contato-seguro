import * as yup from 'yup'
import { validation } from '../Validation';
import { TRequestCreateTaskDto } from '../../usecases/task/create/TRequestCreateTaskDto';

const bodyValidation: yup.ObjectSchema<TRequestCreateTaskDto> =
    yup.object().shape(
        {
            title: yup.string().required().min(3),
            description: yup.string().optional(),
            user: yup.string().required()
        }
    );

const fields = {
    body: bodyValidation,
}

export const CreateTaskDataValidation = validation(fields);