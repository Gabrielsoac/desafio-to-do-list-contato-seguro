import { Task } from "../../../entities/task/Task";
import { ITaskRepository } from "../../../../infra/repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TCreateTaskRequestDto } from "../../../../controllers/task/taskDtos/request/TCreateTaskRequestDto";
import { TTaskResponseDto } from "../../../../controllers/task/taskDtos/response/TTaskResponseDto";
import mongoose from "mongoose";

export class CreateTask implements IUseCase<TCreateTaskRequestDto, TTaskResponseDto> {
   
    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new CreateTask(taskRepository);
    }

    public async execute(input: TCreateTaskRequestDto): Promise<TTaskResponseDto> {

        const userId = new mongoose.Types.ObjectId(input.user); 
        
        const task = Task.create(input.title, input.description || "", userId);

        try {
            const persistedTask = await this.taskRepository.save(task);

            return {...persistedTask};
        }
        catch(err) {
            throw new Error((err as Error).message);
        }
    }
}