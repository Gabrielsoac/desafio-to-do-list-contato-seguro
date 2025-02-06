import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus";

export interface IResponseCreateTaskDto {
    title: string,
    description: string,
    status: TaskStatus,
    createdAt: Date,
    userID: string,
}