import { Task } from "../../../domain/entities/task/Task";
import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TRequestCreateTaskDto } from "./TRequestCreateTaskDto";
import { TResponseCreateTaskDto } from "./TResponseCreateTaskDto";

export class CreateTask implements IUseCase<TRequestCreateTaskDto, TResponseCreateTaskDto> {
   
    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new CreateTask(taskRepository);
    }

    public async execute(input: TRequestCreateTaskDto): Promise<TResponseCreateTaskDto> {
        
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