import { Task } from "../../../entities/task/Task";
import { ITaskRepository } from "../../../../infra/repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TCreateTaskRequestDto } from "../../../../controllers/task/taskDtos/request/TCreateTaskRequestDto";
import { TTaskResponseDto } from "../../../../controllers/task/taskDtos/response/TTaskResponseDto";
import mongoose from "mongoose";
import { IUserRepository } from "../../../../infra/repository/user/IUserRepository";
import { UserNotFoundError } from "../../../../errors/user/UserNotFoundError";

export class CreateTask implements IUseCase<TCreateTaskRequestDto, TTaskResponseDto> {
   
    private taskRepository: ITaskRepository;
    private userRepository: IUserRepository;

    private constructor(taskRepository: ITaskRepository, userRepository: IUserRepository){
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public static create(taskRepository: ITaskRepository, userRepository: IUserRepository){
        return new CreateTask(taskRepository, userRepository);
    }

    public async execute(input: TCreateTaskRequestDto): Promise<TTaskResponseDto> {

        try {

            await this.userRepository.findById(input.user);

            const userId = new mongoose.Types.ObjectId(input.user); 
        
            const task = Task.create(input.title, input.description || "", userId);

            const persistedTask = await this.taskRepository.save(task);

            return {...persistedTask};
        }
        catch(err) {

            if(err instanceof UserNotFoundError){
                throw new UserNotFoundError("Usuário não encontrado");
            }

            throw new Error((err as Error).message);
        }
    }
}