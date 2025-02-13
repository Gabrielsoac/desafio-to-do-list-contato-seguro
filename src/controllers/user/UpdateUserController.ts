/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { TCreateUserRequestDto } from "./userDtos/request/TCreateUserRequestDto";
import { TUserResponseDto } from "./userDtos/response/TUserResponseDto";
import { TFindUserRequestDto } from "./userDtos/request/TFindUserRequest";
import { UpdateUserById } from "../../domain/usecases/user/update/UpdateUser";
import { MongodbUserRepository } from "../../infra/repository/user/MongodbUserRepository";
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