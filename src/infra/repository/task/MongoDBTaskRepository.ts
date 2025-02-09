/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus";
import { Task } from "../../../domain/entities/task/Task";
import { TaskNotFoundError } from "../../../errors/task/TaskNotFoundException";
import { TaskModel } from "../../../models/TaskModel";
import { ITaskRepository } from "./ITaskRepository";
import { TPersistedAllTasks } from "./TPersistedAllTasks";
import { TPersistedTask } from "./TPersistedTask";
import { TUpdateTaskData } from "./TUpdateTaskData";
import { CreateOutputPersistedTask } from "./CreateOutputPersistedTask";

export class MongoDBTaskRepository implements ITaskRepository {
   
    async save(task: Task): Promise<TPersistedTask> {
        
        try {

            const taskPersisted = await TaskModel.create({
                title: task.getTitle(),
                description: task.getDescription(),
                status: TaskStatus.PENDING,
                user: task.getUser()
            });
            
            return CreateOutputPersistedTask.create(taskPersisted);
        } 
        
        catch(err){
            throw new Error("Erro ao salvar usuário");
        }
    }
    
    async findAll(): Promise<TPersistedAllTasks> {
        
        try {
            const tasks = await TaskModel.find();

            const tasksDto = tasks.map(
                task => (CreateOutputPersistedTask.create(task))
            );
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

            return CreateOutputPersistedTask.create(taskUpdated);
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

    async findAllTasksByUser(userId: string): Promise<TPersistedAllTasks> {
        
        try {
            const tasks = await TaskModel.find({ user: userId });
            const tasksDto = tasks.map(
                task => (CreateOutputPersistedTask.create(task))
            )

            return {
                tasks: tasksDto
            }
        } 
        catch(err){
            throw new Error("Erro ao buscar Task do usuário");
        }
    }

    async deleteAllTasksByUser(id: string): Promise<void> {
        
        try {
            await TaskModel.deleteMany({user: id})
        }
        catch {
            throw new Error("Erro ao deletar tasks do usuário");
        }
    }
}