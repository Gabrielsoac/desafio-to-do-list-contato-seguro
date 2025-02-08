import { TaskNotFoundError } from "../../../errors/task/TaskNotFoundException";
import { ITaskRepository } from "../../../repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TTaskResponseDto } from "../TTaskResponseDto";
import { TTaskUpdateRequestDto } from "./TTaskUpdateRequestDto";

export class UpdateTaskById implements IUseCase<TTaskUpdateRequestDto, TTaskResponseDto> {

    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new UpdateTaskById(taskRepository);
    }

    async execute(input: TTaskUpdateRequestDto): Promise<TTaskResponseDto> {
        
        try {
            const taskUpdated = await this.taskRepository.updateTask(
                {
                    id: input.id,
                    title: input.title,
                    description: input.description || "",
                    status: input.status
                }
            );

            return {
                ...taskUpdated
            }
        }
        catch(err){
            throw new TaskNotFoundError((err as TaskNotFoundError).message);
        }

    }
}