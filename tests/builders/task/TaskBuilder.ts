import mongoose from 'mongoose';
import { Task} from '../../../src/domain/entities/task/Task';

export interface ITaskBuilder {
    title: string;
    description: string;
    user: string
}

export class TaskBuilder implements ITaskBuilder {
    
    title: string;
    description: string;
    user: string;

    private constructor(title: string, description: string, user: string){
        this.title = title;
        this.description = description;
        this.user = user;
    }

    public static aUser(){

        const title = "Mocked";
        const description = "Description Mocked";
        const user = "1234567890098765432112";

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

    public withUser(user: string): TaskBuilder {
        this.user = user;
        return this;
    }

    public build(): Task {
        return Task.create(
            this.title,
            this.description,
            new mongoose.Types.ObjectId(this.user),
        );
    }
} 