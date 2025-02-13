import { User } from "../../../domain/entities/user/User";
import { TUpdateUserRequestDto } from "../../../controllers/user/userDtos/request/TUpdateUserRequestDto";
import { TPersistedUser } from "./TPersistedUser";

export interface IUserRepository {
    createUser(user:User): Promise<TPersistedUser>;
    findById(id: string): Promise<TPersistedUser>
    findAll(): Promise<TPersistedUser[]>
    updateUser(userUpdateData: TUpdateUserRequestDto): Promise<TPersistedUser>;
    deleteUser(id: string): void
}