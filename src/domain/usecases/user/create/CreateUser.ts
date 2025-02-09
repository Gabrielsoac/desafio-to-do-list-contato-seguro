import { User } from "../../../entities/user/User";
import { IUserRepository } from "../../../../infra/repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TCreateUserRequestDto } from "../../../../controllers/user/userDtos/request/TCreateUserRequestDto";
import { TUserResponseDto } from "../../../../controllers/user/userDtos/response/TUserResponseDto";
import { UserAlreadyExistsError } from "../../../../errors/user/UserAlreadyExistsError";

export class CreateUser implements IUseCase<TCreateUserRequestDto, TUserResponseDto> {
    
    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public static create(userRepository: IUserRepository){
        return new CreateUser(userRepository);
    }
    
    async execute(input: TCreateUserRequestDto): Promise<TUserResponseDto> {
        try {
            const user = User.create(input.name, input.email, input.password);

            const persistedUser = await this.userRepository.createUser(user);
            
            return {...persistedUser}
            
        } catch(err){
            throw new UserAlreadyExistsError((err as UserAlreadyExistsError).message);
        }
    }
}