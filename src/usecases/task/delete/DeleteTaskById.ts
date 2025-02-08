import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TFindTaskById } from "./TFindTaskById";

export class DeleteTaskById implements IUseCase<TFindTaskById, void> {

    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new DeleteTaskById(taskRepository);
    }

    async execute(input: TFindTaskById): Promise<void> {
        try {
            await this.taskRepository.deleteTask(input.id);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}