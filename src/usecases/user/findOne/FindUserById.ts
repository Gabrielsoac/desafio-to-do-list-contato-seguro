import { UserNotFoundError } from "../../../errors/user/UserNotFoundError";
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

    async execute(input: TFindUserRequestDto): Promise<TUserResponseDto> {
        try {
            const user = await this.userRepository.findById(input.id);
            return user;

        } catch (err) {
            throw new UserNotFoundError((err as UserNotFoundError).message);
        }
    }
}