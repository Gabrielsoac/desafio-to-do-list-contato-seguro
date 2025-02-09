/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { MongodbUserRepository } from "../../infra/repository/user/MongodbUserRepository";
import { FindUserById } from "../../domain/usecases/user/findOne/FindUserById";
import { TFindUserRequestDto } from "../../domain/usecases/user/findOne/TFindUserRequest";
import { StatusCodes } from "http-status-codes";
import { TUserResponseDto } from "../../domain/usecases/user/TUserResponseDto";

const userRepository = new MongodbUserRepository;
const findUserById = FindUserById.create(userRepository);

export const GetUserByIdController = async (
    req: Request<TFindUserRequestDto, {}, {}>,
    res: Response<TUserResponseDto>,
    next: NextFunction) => {

    try {
        const user = await findUserById
            .execute(
                {id: req.params.id}
            );

        res.status(StatusCodes.OK).json(user);

    } catch(error){
        next(error);
    }
}