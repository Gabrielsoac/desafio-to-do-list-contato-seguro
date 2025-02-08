import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";

export type FindTaskById = {
    id: string
}

export class DeleteTaskById implements IUseCase<FindTaskById, void> {

    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new DeleteTaskById(taskRepository);
    }

    async execute(input: FindTaskById): Promise<void> {
        try {
            await this.taskRepository.deleteTask(input.id);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}