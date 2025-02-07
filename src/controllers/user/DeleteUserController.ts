import { Request, Response } from "express";
import { TFindUserRequestDto } from "../../usecases/user/findOne/TFindUserRequest";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { DeleteUserById } from "../../usecases/user/delete/DeleteUser";
import { StatusCodes } from "http-status-codes";
import { TErrorResponse } from "../TErrorResponse";

export const DeleteUserController = async (
    req: Request<TFindUserRequestDto>,
    res: Response< void | TErrorResponse>) => {

    const userRepository = new MongodbUserRepository;
    const DeleteUser = DeleteUserById.create(userRepository); 

    try {
        await DeleteUser.execute(
            {
                id: req.params.id
            }
        );
        res.status(StatusCodes.OK).end();
    }
    catch(err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            code: StatusCodes.BAD_REQUEST,
            message: (err as Error).message   
        });
    }
}