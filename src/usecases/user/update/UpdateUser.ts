import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TUserResponseDto } from "../TUserResponseDto";
import { TUpdateUserRequestDto } from "./TUpdateUserRequestDto";

export class UpdateUser implements IUseCase<TUpdateUserRequestDto, TUserResponseDto> {

    private userRepository: IUserRepository;

    private constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }


    public static create(userRepository: IUserRepository){
        return new UpdateUser(userRepository);

    }

    execute(input: TUpdateUserRequestDto): Promise<TUserResponseDto> {
        
        try {
            const updatedUser = this.userRepository.updateUser({...input});
            return updatedUser;
        }
        catch(err){
            throw new Error(`Erro ao atualizar dados: ${(err as Error).message}`);
        }
    }
}