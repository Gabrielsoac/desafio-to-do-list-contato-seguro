/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../domain/entities/user/User";
import { UserModel } from "../../models/UserModel";
import { TUpdateUserRequestDto } from "../../usecases/user/update/TUpdateUserRequestDto";
import { IUserRepository } from "./IUserRepository";
import { TPersistedUser } from "./TPersistedUser";

export class MongodbUserRepository implements IUserRepository {
    
    public async createUser(user: User): Promise<TPersistedUser> {
        
        try {
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
            throw new Error(`Erro ao salvar usuário: ${(err as Error).message}`);
        }

    }
    
    public async findById(id: string): Promise<TPersistedUser> {
        try {
            
            const user = await UserModel.findById(id);

            if(!user) {
                throw new Error(`Usuário com o id: ${id} não encontrado!`);
            } else {
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                };
            }
        } 
        catch (err) {
            throw new Error(`Usuário não encontrado: ${(err as Error).message}`);
        }
    }

    public async findAll(): Promise<TPersistedUser[]> {
        throw new Error("Method not implemented.");
    }
    
    public async updateUser(userUpdateData: TUpdateUserRequestDto): Promise<TPersistedUser> {
        throw new Error("Method not implemented.");
    }
    
    public async deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}