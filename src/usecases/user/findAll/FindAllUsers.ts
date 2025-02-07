import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TUsersResponseDto } from "./TUsersResponseDto";

export class FindAllUsers implements IUseCase<void, TUsersResponseDto> {
    
        private userRepository: IUserRepository;
    
        private constructor(userRepository: IUserRepository){
            this.userRepository = userRepository;
        }
    
        public static create(userRepository: IUserRepository){
            return new FindAllUsers(userRepository);
        }

    async execute(): Promise<TUsersResponseDto> {

        try {
            const usersPersisted = await this.userRepository.findAll();
            return usersPersisted;
        } catch (err) {
            throw new Error(`Erro ao buscar todos os usuários: ${(err as Error).message}`);
        }
    }
}