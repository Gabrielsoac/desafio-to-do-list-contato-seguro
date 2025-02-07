import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus";

export interface IResponseCreateTaskDto {
    title: string,
    description: string,
    status: TaskStatus,
    userID: string,
    createdAt: Date,
    updatedAt: Date
}