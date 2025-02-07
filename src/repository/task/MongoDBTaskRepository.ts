/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";
import { Task } from "../../domain/entities/task/Task";
import { TaskModel } from "../../models/TaskModel";
import { ITaskRepository } from "./ITaskRepository";
import { TTaskPersistedProps } from "./TPersistedTask";

export class MongoDBTaskRepository implements ITaskRepository {
   
    async save(task: Task): Promise<TTaskPersistedProps> {
        
        try {
            const taskPersisted = await TaskModel.create({
                title: task.getTitle(),
                description: task.getDescription(),
                status: TaskStatus.PENDING,
                user: task.getUser()

            });
            
            return {
                id: taskPersisted._id.toString(),
                title: taskPersisted.title,
                description: taskPersisted.description || "",
                status: taskPersisted.status || TaskStatus.PENDING,
                userID: taskPersisted.user._id.toString(),
                createdAt: taskPersisted.createdAt || new Date(),
                updatedAt: taskPersisted.updatedAt || new Date()
            } 
        } 
        
        catch(err){
            throw new Error((err as Error).message);
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