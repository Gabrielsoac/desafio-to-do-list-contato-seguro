import { Task } from "../../domain/entities/task/Task"
import { TTaskPersistedProps } from "./TTaskPersistedProps"

export interface ITaskRepository {
    save(task: Task): Promise<TTaskPersistedProps>
    findAll(): Promise<TTaskPersistedProps[]>
    updateTask(task: Task): Promise<TTaskPersistedProps>
    deleteTask(task: Task): Promise<void>
}