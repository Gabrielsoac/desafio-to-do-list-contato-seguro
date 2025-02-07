/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";
import { Task } from "../../domain/entities/task/Task";
import { TaskModel } from "../../models/TaskModel";
import { ITaskRepository } from "./ITaskRepository";
import { TTaskPersistedProps } from "./TTaskPersistedProps";

export class MongoDBTaskRepository implements ITaskRepository {
   
    async save(task: Task): Promise<TTaskPersistedProps> {
        
        const taskPersisted = await TaskModel.create(task);
        return {
            id: taskPersisted._id.toString(),
            title: taskPersisted.title,
            description: taskPersisted.description || "",
            status: taskPersisted.status || TaskStatus.PENDING,
            user: taskPersisted.user._id.toString(),
            createdAt: taskPersisted.createdAt || new Date(),
            updatedAt: taskPersisted.updatedAt || new Date()
        }
    }
    
    async findAll(): Promise<TTaskPersistedProps[]> {
        throw new Error("Method not implemented.");
    }
    
    async updateTask(task: Task): Promise<TTaskPersistedProps> {
        throw new Error("Method not implemented.");
    }
    
    async deleteTask(task: Task): Promise<void> {
        
    }

}