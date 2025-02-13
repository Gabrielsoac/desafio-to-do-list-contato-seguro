import { TaskStatus } from "../../../../domain/entities/task/EnumTaskStatus"

export type TTaskUpdateRequestDto = {
    id: string,
    title: string,
    description?: string,
    status: TaskStatus
}