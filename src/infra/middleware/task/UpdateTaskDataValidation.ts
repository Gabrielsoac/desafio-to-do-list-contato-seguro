import * as yup from 'yup'
import { validation } from '../Validation';
import { TRequestUpdateTaskDto } from '../../../controllers/task/UpdateTaskController';
import { TGetTaskByIdRequestDto } from '../../../controllers/task/taskDtos/request/TGetTaskByIdRequestDto';
import { TaskStatus } from '../../../domain/entities/task/EnumTaskStatus';

const bodyValidation: yup.ObjectSchema<TRequestUpdateTaskDto> =
    yup.object().shape(
        {
            title: yup.string().required().min(3),
            description: yup.string().optional(),
            status: yup.string().required().oneOf(Object.values(TaskStatus)),
        }
    );

const paramsValidation: yup.ObjectSchema<TGetTaskByIdRequestDto> =
    yup.object().shape(
        {
            id: yup.string().required(),
        }
    );

const fields = {
    body: bodyValidation,
    params: paramsValidation
}

export const UpdateTaskByIdDataValidation = validation(fields);