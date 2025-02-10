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

    private constructor(data: ITaskBuilder){
        this.title = data.title;
        this.description = data.description;
        this.user = data.user;
    }

    public static aTask(): TaskBuilder{
        const title = "Mocked";
        const description = "Description Mocked";
        const user = new mongoose.Types.ObjectId('64a9f8b5f2a1e2b3c4d56789');

        return new TaskBuilder({
            title, description, user
        });
    }

    public withTitle(title: string): TaskBuilder {
        return new TaskBuilder({
            ...this, title
        });

    }

    public withDescription(description: string): TaskBuilder {
        return {...this, description}
    }

    public withUser(user: mongoose.Types.ObjectId): TaskBuilder {
        return {...this, user}
    }

    public build(): Task {
        return Task.create(
            this.title,
            this.description,
            this.user
        );
    }
} 