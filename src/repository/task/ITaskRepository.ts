import { Task } from "../../domain/entities/task/Task"
import { TPersistedAllTasks } from "./TPersistedAllTasks"
import { TPersistedTask } from "./TPersistedTask"
import { TUpdateTaskData } from "./TUpdateTaskData"

export interface ITaskRepository {
    save(task: Task): Promise<TPersistedTask>
    findAll(): Promise<TPersistedAllTasks>
    updateTask(task: TUpdateTaskData): Promise<TPersistedTask>
    deleteTask(id: string): Promise<void>
}