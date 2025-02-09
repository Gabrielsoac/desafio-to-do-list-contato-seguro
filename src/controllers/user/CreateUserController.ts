import { NextFunction, Request, Response } from "express";
import { TCreateUserRequestDto } from "./userDtos/request/TCreateUserRequestDto";
import { TUserResponseDto } from "./userDtos/response/TUserResponseDto";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../domain/usecases/user/create/CreateUser";
import { MongodbUserRepository } from "../../infra/repository/user/MongodbUserRepository";

const userRepository = new MongodbUserRepository;
const createUser = CreateUser.create(userRepository); 

export const CreateUserController = async (
    req: Request<TCreateUserRequestDto>,
    res: Response<TUserResponseDto>,
    next: NextFunction) => {

    try {
        const user = await createUser.execute(req.body);
        const locationUrl = `${req.protocol}://${req.get('host')}/user/${user.id}`;

        res.status(StatusCodes.CREATED).location(locationUrl).json(user);
    } 
    catch(err){
        next(err);
    }
}