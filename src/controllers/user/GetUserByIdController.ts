/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { FindUserById } from "../../usecases/user/findOne/FindUserById";
import { TFindUserRequestDto } from "../../usecases/user/findOne/TFindUserRequest";
import { StatusCodes } from "http-status-codes";
import { TUserResponseDto } from "../../usecases/user/TUserResponseDto";
import { TErrorResponseDto } from "../TErrorResponse";

const userRepository = new MongodbUserRepository;
const findUserById = FindUserById.create(userRepository);

export const GetUserByIdController = async (
    req: Request<TFindUserRequestDto, {}, {}>,
    res: Response<TUserResponseDto | TErrorResponseDto>) => {

    try {
        const user = await findUserById
            .execute(
                {id: req.params.id}
            );

        res.status(StatusCodes.OK).json(user);

    } catch(err){

        const error = {
            code: StatusCodes.NOT_FOUND,
            message: (err as Error).message
        }

        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}