/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../../domain/entities/user/User";
import { UserAlreadyExistsError } from "../../../errors/user/UserAlreadyExistsError";
import { UserNotFoundError } from "../../../errors/user/UserNotFoundError";
import { UserModel } from "../../../models/UserModel";
import { TUpdateUserRequestDto } from "../../../domain/usecases/user/update/TUpdateUserRequestDto";
import { IUserRepository } from "./IUserRepository";
import { TPersistedUser } from "./TPersistedUser";

export class MongodbUserRepository implements IUserRepository {
    
    public async createUser(user: User): Promise<TPersistedUser> {
        
        try {

            const validation = await UserModel.findOne({ email: user.getEmail()});

            if(validation){
                throw new UserAlreadyExistsError("Usuário com este email já existe");
            }

            const userPersisted = await UserModel.create(
                {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword()
                }
            );

            return {
                id: userPersisted._id.toString(),
                name: userPersisted.name,
                email: userPersisted.email
            };

        } catch(err) {
            throw new UserAlreadyExistsError((err as UserAlreadyExistsError).message);
        }
    }
    
    public async findById(id: string): Promise<TPersistedUser> {
        try {
            
            const user = await UserModel.findById(id);

            if(!user) {
                throw new UserNotFoundError(`Usuário com o id: ${id} não encontrado!`);
            } else {
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                };
            }
        } 
        catch (err) {
            throw new UserNotFoundError("Usuário não encontrado");
        }
    }

    public async findAll(): Promise<TPersistedUser[]> {
        
        try {
            const users = await UserModel.find();

            const usersDto = users.map(
                user => ({
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                })
            );

            return usersDto;
        } catch(err) {
            throw new Error("Erro ao buscar todos os usuários");
        }
    }
    
    public async updateUser(userUpdateData: TUpdateUserRequestDto): Promise<TPersistedUser> {
        try {
            
            const user = await UserModel.findById(userUpdateData.id);
            if (!user) {
                throw new UserNotFoundError("Usuário não encontrado");
            }
    
            
            const existingUser = await UserModel.findOne({ email: userUpdateData.email });
            if (existingUser && existingUser._id.toString() !== userUpdateData.id) {
                throw new UserAlreadyExistsError("Usuário com este email já existe");
            }
            
            const userUpdated = await UserModel.findByIdAndUpdate(
                userUpdateData.id,
                {
                    name: userUpdateData.name,
                    email: userUpdateData.email,
                    password: userUpdateData.password
                },
                { new: true, runValidators: true }
            );
    
            if (!userUpdated) {
                throw new UserNotFoundError("Erro ao atualizar usuário");
            }
    
            return {
                id: userUpdated._id.toString(),
                name: userUpdated.name,
                email: userUpdated.email,
            };
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                throw new UserNotFoundError("Usuário não encontrado");
            } else if (err instanceof UserAlreadyExistsError) {
                throw new UserAlreadyExistsError("Usuário já existe");
            } else {
                throw new Error("Erro inesperado ao tentar atualizar o usuário");
            }
        }
    }
    
    
    public async deleteUser(id: string): Promise<void> {
        
        try {
            await UserModel.findByIdAndDelete(id).then(
                user => {
                    if(!user) {
                        throw new UserNotFoundError("Usuário não encontrado");
                    }
                }
            );
        }      
        catch(err) {
            throw new UserNotFoundError("Usuário não encontrado");
        }
    }
}