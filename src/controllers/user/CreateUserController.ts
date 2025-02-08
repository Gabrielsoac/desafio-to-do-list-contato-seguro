import { NextFunction, Request, Response } from "express";
import { TCreateUserRequestDto } from "../../usecases/user/create/TCreateUserRequestDto";
import { TUserResponseDto } from "../../usecases/user/TUserResponseDto";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../usecases/user/create/CreateUser";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";

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