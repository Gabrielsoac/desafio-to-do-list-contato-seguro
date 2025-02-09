import mongoose from "mongoose";
import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus";

export class CreateOutputPersistedTask {

    public static create(taskPersisted: mongoose.AnyObject){

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
}