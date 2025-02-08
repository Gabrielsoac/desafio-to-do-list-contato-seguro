import { Task } from "../../../domain/entities/task/Task";
import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TRequestCreateTaskDto } from "./TRequestCreateTaskDto";
import { TResponseTaskDto } from "../TTaskResponseDto";

export class CreateTask implements IUseCase<TRequestCreateTaskDto, TResponseTaskDto> {
   
    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new CreateTask(taskRepository);
    }

    public async execute(input: TRequestCreateTaskDto): Promise<TResponseTaskDto> {
        
        const task = Task.create(input.title, input.description || "", input.user);

        try {
            const persistedTask = await this.taskRepository.save(task);

            return {...persistedTask};
        }
        catch {
            throw new Error("Erro ao salvar Task");
        }
    }
}