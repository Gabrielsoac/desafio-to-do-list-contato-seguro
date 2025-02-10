import mongoose from 'mongoose';
import { Task } from '../../../src/domain/entities/task/Task';

export interface ITaskBuilder {
    title: string;
    description: string;
    user: mongoose.Types.ObjectId
}

export class TaskBuilder implements ITaskBuilder {
    
    title: string;
    description: string;
    user: mongoose.Types.ObjectId;

    private constructor(title: string, description: string, user: mongoose.Types.ObjectId){
        this.title = title;
        this.description = description;
        this.user = user;
    }

    public static aTask(): TaskBuilder{
        const title = "Mocked";
        const description = "Description Mocked";
        const user = new mongoose.Types.ObjectId('64a9f8b5f2a1e2b3c4d56789');

        return new TaskBuilder(title, description, user);
    }

    public withTitle(title: string): TaskBuilder {
        this.title = title;
        return this;
    }

    public withDescription(description: string): TaskBuilder {
        this.description = description;
        return this;
    }

    public withUser(user: mongoose.Types.ObjectId): TaskBuilder {
        this.user = user;
        return this;
    }

    public build(): Task {
        return Task.create(
            this.title,
            this.description,
            this.user
        );
    }
} 