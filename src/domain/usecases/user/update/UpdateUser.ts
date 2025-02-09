import { UserAlreadyExistsError } from "../../../../errors/user/UserAlreadyExistsError";
import { IUserRepository } from "../../../../infra/repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TUserResponseDto } from "../../../../controllers/user/userDtos/response/TUserResponseDto";
import { TUpdateUserRequestDto } from "../../../../controllers/user/userDtos/request/TUpdateUserRequestDto";

export class UpdateUserById implements IUseCase<TUpdateUserRequestDto, TUserResponseDto> {

    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new UpdateUserById(userRepository);

    }

    execute(input: TUpdateUserRequestDto): Promise<TUserResponseDto> {
        
        try {
            const updatedUser = this.userRepository.updateUser({...input});
            return updatedUser;
        }
        catch(err){
            throw new UserAlreadyExistsError((err as UserAlreadyExistsError).message);
        }
    }
}