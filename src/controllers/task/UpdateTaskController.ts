/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { TTaskResponseDto } from "../../domain/usecases/task/TTaskResponseDto";
import { TFindTaskById } from "../../domain/usecases/task/delete/TFindTaskById";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../infra/repository/task/MongoDBTaskRepository";
import { UpdateTaskById } from "../../domain/usecases/task/update/UpdateTaskById";
import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";

export type TRequestUpdateTaskDto = {

    title: string,
    description?: string,
    status: TaskStatus
}


const taskRepository = new MongoDBTaskRepository;
const updateTask = UpdateTaskById.create(taskRepository);

export const UpdateTaskController = async (
    req: Request<TFindTaskById, {}, TRequestUpdateTaskDto>,
    res: Response<TTaskResponseDto>,
    next: NextFunction) => {

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

    }     
    catch(err){
        next(err);
    }
} 