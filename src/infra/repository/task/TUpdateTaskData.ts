import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus"

export type TUpdateTaskData = {
    id: string,
    title: string,
    description?: string,
    status: TaskStatus
}