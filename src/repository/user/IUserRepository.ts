import { User } from "../../domain/entities/user/User";

export interface IUserRepository {
    createUser(user:User): Promise<User>;
    findAll(): void
    updateUser(name: string, email: string, password: string): Promise<User>;
    deleteUser(id: string): void
}