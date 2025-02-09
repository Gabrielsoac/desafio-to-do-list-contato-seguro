import { UserNotFoundError } from "../../../../errors/user/UserNotFoundError";
import { ITaskRepository } from "../../../../infra/repository/task/ITaskRepository";
import { IUserRepository } from "../../../../infra/repository/user/IUserRepository";
import { IUseCase } from "../../IUseCase";
import { TDeleteUserRequestDto } from "../../../../controllers/user/userDtos/request/TDeleteUserRequestDto";

export class DeleteUserById implements IUseCase<TDeleteUserRequestDto, void> {

    private userRepository: IUserRepository;
    private taskRepository: ITaskRepository;

    private constructor(userRepository: IUserRepository, taskRepository: ITaskRepository){
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public static create(userRepository: IUserRepository, taskRepository: ITaskRepository){
        return new DeleteUserById(userRepository, taskRepository);
    }

    async execute(input: TDeleteUserRequestDto): Promise<void> {
        try {
            await this.userRepository.deleteUser(input.id);
            await this.taskRepository.deleteAllTasksByUser(input.id);
        } catch(err){
            throw new UserNotFoundError((err as UserNotFoundError).message);
        }
    }
}