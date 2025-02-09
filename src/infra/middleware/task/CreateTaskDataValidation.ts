import * as yup from 'yup'
import { validation } from '../Validation';
import { TCreateTaskRequestDto } from '../../../controllers/task/taskDtos/request/TCreateTaskRequestDto';

const bodyValidation: yup.ObjectSchema<TCreateTaskRequestDto> =
    yup.object().shape(
        {
            title: yup.string().required().min(3),
            description: yup.string().optional(),
            user: yup.string().required().min(24).max(24)
        }
    );

const fields = {
    body: bodyValidation,
}

export const CreateTaskDataValidation = validation(fields);