import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TUserResponseDto } from "../TUserResponseDto";
import { TFindUserRequestDto } from "./TFindUserRequest";

export class FindUserById implements IUseCase<TFindUserRequestDto, TUserResponseDto> {

    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new FindUserById(userRepository);
    }

    execute(input: TFindUserRequestDto): Promise<TUserResponseDto> {
        try {
            const user = this.userRepository.findById(input.id);
            return user;

        } catch (err) {
            throw new Error(`Erro ao buscar usuário: ${(err as Error).message}`);
        }
    }
}