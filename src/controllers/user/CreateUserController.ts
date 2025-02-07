import { Request, Response } from "express";
import { TCreateUserRequestDto } from "../../usecases/user/create/TCreateUserRequestDto";
import { TUserResponseDto } from "../../usecases/user/TUserResponseDto";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../usecases/user/create/CreateUser";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";

const userRepository = new MongodbUserRepository;
const createUser = CreateUser.create(userRepository); 

export const CreateUserController = async (
    req: Request<TCreateUserRequestDto>,
    res: Response<TUserResponseDto>) => {

    try {
        console.log("Passei pelo controller");
        const user = await createUser.execute(req.body);
        res.status(StatusCodes.OK).json(user);
    } 
    catch (err){
        throw new Error(`Erro ao tentar criar usuário: ${(err as Error).message}`);
    }
}