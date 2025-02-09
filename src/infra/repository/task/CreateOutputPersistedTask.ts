import mongoose from "mongoose";
import { TaskStatus } from "../../../domain/entities/task/EnumTaskStatus";

    const formatterDate = Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo',
});

export class CreateOutputPersistedTask {

    public static create(taskPersisted: mongoose.AnyObject){

        const createdAt: string = formatterDate.format(taskPersisted.createdAt);
        const updatedAt: string = formatterDate.format(taskPersisted.updatedAt);

        return {
                id: taskPersisted._id.toString(),
                title: taskPersisted.title,
                description: taskPersisted.description || "",
                status: taskPersisted.status || TaskStatus.PENDING,
                userID: taskPersisted.user._id.toString(),
                createdAt: createdAt,
                updatedAt: updatedAt
        } 
    }
}