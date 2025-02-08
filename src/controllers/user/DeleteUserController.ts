import { NextFunction, Request, Response } from "express";
import { TFindUserRequestDto } from "../../usecases/user/findOne/TFindUserRequest";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { DeleteUserById } from "../../usecases/user/delete/DeleteUser";
import { StatusCodes } from "http-status-codes";

export const DeleteUserController = async (
    req: Request<TFindUserRequestDto>,
    res: Response< void >,
    next: NextFunction) => {

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
    catch(err){
        next(err);
    }
}