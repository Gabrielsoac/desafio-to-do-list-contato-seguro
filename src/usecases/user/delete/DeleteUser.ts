import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TDeleteUserRequestDto } from "./TDeleteUserRequestDto";

export class DeleteUserById implements IUseCase<TDeleteUserRequestDto, void> {

    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new DeleteUserById(userRepository);
    }

    async execute(input: TDeleteUserRequestDto): Promise<void> {
        try {
            await this.userRepository.deleteUser(input.id);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}