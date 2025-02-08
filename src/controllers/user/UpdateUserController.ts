/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { TCreateUserRequestDto } from "../../usecases/user/create/TCreateUserRequestDto";
import { TUserResponseDto } from "../../usecases/user/TUserResponseDto";
import { TFindUserRequestDto } from "../../usecases/user/findOne/TFindUserRequest";
import { UpdateUserById } from "../../usecases/user/update/UpdateUser";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { StatusCodes } from "http-status-codes";

export const UpdateUserController = async (
    req: Request<TFindUserRequestDto, {}, TCreateUserRequestDto>,
    res: Response<TUserResponseDto>,
    next: NextFunction) => {

    const userRepository = new MongodbUserRepository;
    const UpdateUser = UpdateUserById.create(userRepository); 
    
    try {
        const updatedUser = await UpdateUser.execute(
            {
                id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        );

        res.status(StatusCodes.OK).json(updatedUser);
    } 
    catch(err){
        next(err);
    }
}