/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TTaskResponseDto } from "../../usecases/task/TTaskResponseDto";
import { TErrorResponse } from "../TErrorResponse";
import { TFindTaskById } from "../../usecases/task/delete/TFindTaskById";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { UpdateTaskById } from "../../usecases/task/update/UpdateTaskById";
import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";

export type TRequestUpdateTaskDto = {

    id: string,
    title: string,
    description?: string,
    status: TaskStatus
}


const taskRepository = new MongoDBTaskRepository;
const updateTask = UpdateTaskById.create(taskRepository);

export const UpdateTaskController = async (
    req: Request<TFindTaskById, {}, TRequestUpdateTaskDto>,
    res: Response<TTaskResponseDto | TErrorResponse>) => {

    try {

        const userUpdated = await updateTask.execute(
            {
                id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }
        ); 

        res.status(StatusCodes.OK).json(
            {
                ...userUpdated
            }
        );

    } catch(err){ 
        res.status(StatusCodes.BAD_REQUEST).json(
            {
                code: StatusCodes.BAD_REQUEST,
                message: (err as Error).message
            }
        )
    }

} 