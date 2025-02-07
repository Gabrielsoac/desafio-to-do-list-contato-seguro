import { Request, Response } from "express";
import { TCreateUserRequestDto } from "../../usecases/user/create/TCreateUserRequestDto";
import { TUserResponseDto } from "../../usecases/user/TUserResponseDto";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../usecases/user/create/CreateUser";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { TErrorResponse } from "../TErrorResponse";

const userRepository = new MongodbUserRepository;
const createUser = CreateUser.create(userRepository); 

export const CreateUserController = async (
    req: Request<TCreateUserRequestDto>,
    res: Response<TUserResponseDto | TErrorResponse>) => {

    try {
        const user = await createUser.execute(req.body);
        const locationUrl = `${req.protocol}://${req.get('host')}/user/${user.id}`;

        res.status(StatusCodes.CREATED).location(locationUrl).json(user);
    } 
    catch (err){
        const error = {
            code: StatusCodes.BAD_REQUEST,
            message: (err as Error).message,
        }
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}