import * as yup from 'yup'
import { validation } from '../Validation';
import { TGetTaskByIdRequestDto } from '../../../controllers/task/taskDtos/request/TGetTaskByIdRequestDto';

const paramsValidation: yup.ObjectSchema<TGetTaskByIdRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required().min(1)
        }
    );

const fields = {
    params: paramsValidation,
}

export const DeleteTaskDataValidation = validation(fields);