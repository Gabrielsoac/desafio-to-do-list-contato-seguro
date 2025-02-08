/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskStatus } from "../../domain/entities/task/EnumTaskStatus";
import { Task } from "../../domain/entities/task/Task";
import { TaskNotFoundError } from "../../errors/task/TaskNotFoundException";
import { TaskModel } from "../../models/TaskModel";
import { ITaskRepository } from "./ITaskRepository";
import { TPersistedAllTasks } from "./TPersistedAllTasks";
import { TPersistedTask } from "./TPersistedTask";
import { TUpdateTaskData } from "./TUpdateTaskData";

export class MongoDBTaskRepository implements ITaskRepository {
   
    async save(task: Task): Promise<TPersistedTask> {
        
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
            throw new Error("Erro ao salvar usuário");
        }
    }
    
    async findAll(): Promise<TPersistedAllTasks> {
        
        try {
            const tasks = await TaskModel.find();

            const tasksDto = tasks.map(
                task => (
                    {
                        id: task._id.toString(),
                        title: task.title,
                        description: task.description || "",
                        status: task.status || TaskStatus.PENDING,
                        userID: task.user._id.toString(),
                        createdAt: task.createdAt || new Date(),
                        updatedAt: task.updatedAt || new Date()
                    }
                )
            )
            return {tasks: tasksDto};
        }   
        catch(err){
            throw new Error("Erro ao buscar todos os usuários");
        }
    }
    
    async updateTask(task: TUpdateTaskData): Promise<TPersistedTask> {
        
        try {
            const taskUpdated = await TaskModel.findByIdAndUpdate(
                {
                    _id: task.id,
                }, {
                    title: task.title,
                    description: task.description || "",
                    status: task.status
                },
                {
                    new: true,
                    runValidators: true,
                    timestamps: true
                }
            );

            if(!taskUpdated){
                throw new Error("Erro ao atualizar task");
            }

            return {
                id: taskUpdated._id.toString(),
                title: taskUpdated.title,
                description: taskUpdated.description || "",
                status: taskUpdated.status || TaskStatus.PENDING,
                userID: taskUpdated.user._id.toString(),
                createdAt: taskUpdated.createdAt || new Date(),
                updatedAt: taskUpdated.updatedAt || new Date()
            } 
        } catch(err){
            throw new TaskNotFoundError("Task não encontrada");
        }
    }
    
    async deleteTask(id: string): Promise<void> {

        try {
            await TaskModel.findByIdAndDelete(id).then(
                task => {
                    if(!task){
                        throw new TaskNotFoundError("Task não encontrada");
                    }
                }
            );
        } catch(err){
            throw new TaskNotFoundError("Task não encontrada");
        }
    }
}