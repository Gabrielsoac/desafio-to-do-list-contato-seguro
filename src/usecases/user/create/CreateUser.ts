import { User } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TCreateUserRequestDto } from "./TCreateUserRequestDto";
import { TUserResponseDto } from "../TUserResponseDto";

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
            throw new Error(`Erro ao criar usuário: ${(err as Error).message}`);
        }
    }
}