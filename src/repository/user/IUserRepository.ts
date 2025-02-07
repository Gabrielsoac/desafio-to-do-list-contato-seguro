import { User } from "../../domain/entities/user/User";
import { TPersistedUser } from "./TPersistedUser";

export interface IUserRepository {
    createUser(user:User): Promise<TPersistedUser>;
    findAll(): void
    updateUser(id: string, name: string, email: string, password: string): Promise<TPersistedUser>;
    deleteUser(id: string): void
}