import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TAllTasksResponseDto } from "./TAllTasksResponseDto";

export class FindAllTasks implements IUseCase<void, TAllTasksResponseDto> {

    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository) {
        return new FindAllTasks(taskRepository);
    }

    async execute(): Promise<TAllTasksResponseDto> {
        
        try {
            const tasks = await this.taskRepository.findAll();
            return tasks;
        }   
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}