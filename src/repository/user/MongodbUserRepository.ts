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
            throw new Error((err as Error).message);
        }
    }
    
    public async updateUser(userUpdateData: TUpdateUserRequestDto): Promise<TPersistedUser> {
        
        try {
            const user = await UserModel.findByIdAndUpdate(
                {
                    _id: userUpdateData.id,
                },
                {
                    name: userUpdateData.name,
                    email: userUpdateData.email,
                    password: userUpdateData.password

                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if(!user) {
                throw new Error("Erro ao atualizar usuário");
            }

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }
        }

        catch(err){
            throw new Error((err as Error).message);
        }
    }
    
    public async deleteUser(id: string): Promise<void> {
        try {
            UserModel.findByIdAndDelete(id);
        } 
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}