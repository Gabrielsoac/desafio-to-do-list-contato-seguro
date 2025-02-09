import { UserNotFoundError } from "../../../errors/user/UserNotFoundError";
import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUserRepository } from "../../../repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TAllTasksResponseDto } from "../../task/findAll/TAllTasksResponseDto";
import { TFindUserRequestDto } from "../../user/findOne/TFindUserRequest";

export class FindAllTasksByUser implements IUseCase<TFindUserRequestDto, TAllTasksResponseDto> {

    private userRepository: IUserRepository;
    private taskRepository: ITaskRepository;

    private constructor(userRepository: IUserRepository, taskRepository: ITaskRepository){
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public static create(userRepository: IUserRepository, taskRepository: ITaskRepository){
        return new FindAllTasksByUser(userRepository, taskRepository);
   }

    async execute(input: TFindUserRequestDto): Promise<TAllTasksResponseDto> {

        try {
            const user = await this.userRepository.findById(input.id);

            if(!user){
                throw new UserNotFoundError("Usuário não encontrado");
            }

            const tasks = await this.taskRepository.findAllTasksByUser(input.id);

            return tasks;
        }
        catch(err) {
            if(err instanceof UserNotFoundError){
                throw new UserNotFoundError((err as UserNotFoundError).message);
            }

            throw new Error("Erro ao buscar tasks");
        }
    }
}