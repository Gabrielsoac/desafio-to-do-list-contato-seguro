import { TaskNotFoundError } from "../../../../errors/task/TaskNotFoundException";
import { ITaskRepository } from "../../../../infra/repository/task/ITaskRepository";
import { IUseCase } from "../../IUseCase";
import { TGetTaskByIdRequestDto } from "../../../../controllers/task/taskDtos/request/TGetTaskByIdRequestDto";

export class DeleteTaskById implements IUseCase<TGetTaskByIdRequestDto, void> {

    private taskRepository: ITaskRepository;

    private constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    public static create(taskRepository: ITaskRepository){
        return new DeleteTaskById(taskRepository);
    }

    async execute(input: TGetTaskByIdRequestDto): Promise<void> {
        try {
            await this.taskRepository.deleteTask(input.id);
        } catch(err){
            throw new TaskNotFoundError((err as TaskNotFoundError).message);
        }
    }
}