import { Request, Response } from "express"
import { TFindTaskById } from "../../usecases/task/delete/TFindTaskById"
import { TErrorResponse } from "../TErrorResponse"
import { StatusCodes } from "http-status-codes"
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository"
import { DeleteTaskById } from "../../usecases/task/delete/DeleteTaskById"

const taskRepository = new MongoDBTaskRepository;
const deleteTask = DeleteTaskById.create(taskRepository);

export const DeleteTaskController =  async (
    req: Request<TFindTaskById>,
    res: Response<void | TErrorResponse>) => {

    try {
        await deleteTask.execute({
            id: req.params.id
        });

        res.status(StatusCodes.OK).end();
    } catch(err){
        res.status(StatusCodes.NOT_FOUND).json(
            {
                code: StatusCodes.NOT_FOUND,
                message: (err as Error).message
            }
        );
    }
}