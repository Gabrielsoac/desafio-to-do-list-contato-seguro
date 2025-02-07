import { Task } from "../../../domain/entities/task/Task";
import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { IRequestCreateTaskDto } from "./IRequestCreateTaskDto";
import { IResponseCreateTaskDto } from "./IResponseCreateTaskDto";

export class CreateTask implements IUseCase<IRequestCreateTaskDto, IResponseCreateTaskDto> {
   
    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new CreateTask(taskRepository);
    }

    public async execute(input: IRequestCreateTaskDto): Promise<IResponseCreateTaskDto> {
        
        const task = Task.create(input.title, input.description || "", input.user);

        try {
            const persistedTask = await this.taskRepository.save(task);

            return {
                title: persistedTask.title,
                description: persistedTask.description,
                status: persistedTask.status,
                userID: persistedTask.user,
                createdAt: persistedTask.createdAt,
                updatedAt: persistedTask.updatedAt
            };
        }
        catch {
            throw new Error("Erro ao salvar Task");
        }
    }
}