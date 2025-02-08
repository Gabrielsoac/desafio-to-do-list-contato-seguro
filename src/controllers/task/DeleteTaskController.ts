/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { TFindTaskById } from "../../usecases/task/delete/TFindTaskById"
import { StatusCodes } from "http-status-codes"
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository"
import { DeleteTaskById } from "../../usecases/task/delete/DeleteTaskById"
import { TaskNotFoundError } from "../../errors/task/TaskNotFoundException"

const taskRepository = new MongoDBTaskRepository;
const deleteTask = DeleteTaskById.create(taskRepository);

export const DeleteTaskController =  async (
    req: Request<TFindTaskById>,
    res: Response<void>,
    next: NextFunction) => {

    try {
        await deleteTask.execute({
            id: req.params.id
        });

        res.status(StatusCodes.OK).end();
    }
    catch(err){
        next(err);
    }
}   
