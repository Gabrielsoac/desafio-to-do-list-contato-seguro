import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";

export type TTaskPersistedProps = {
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    userID: string,
    createdAt: Date,
    updatedAt: Date
} 