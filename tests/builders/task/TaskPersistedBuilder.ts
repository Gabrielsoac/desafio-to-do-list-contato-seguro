import mongoose from 'mongoose';
import { TaskStatus } from '../../../src/domain/entities/task/EnumTaskStatus';

export interface ITaskPersistedBuilder {
    id: string;
    title: string;
    description?: string;
    status?: TaskStatus;
    user: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TaskPersistedBuilder implements ITaskPersistedBuilder {
    id: string;
    title: string;
    description?: string | undefined;
    status?: TaskStatus | undefined;
    user: mongoose.Types.ObjectId;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    private constructor(input: ITaskPersistedBuilder) {
        this.id = input.id;
        this.title = input.title;
        this.description = input.description;
        this.status = input.status;
        this.user = input.user;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static aTask() {
        const id = '64a9f8b5f2a1e2b3c4d56788';
        const title = "Mocked";
        const description = "Description Mocked";
        const status = TaskStatus.IN_PROGRESS;
        const user = new mongoose.Types.ObjectId('64a9f8b5f2a1e2b3c4d56789');
        const createdAt = new Date(Date.UTC(2025, 1, 10, 11, 53));
        const updatedAt = new Date(Date.UTC(2025, 1, 10, 11, 53));

        return new TaskPersistedBuilder({
            id: id,
            title: title,
            description: description,
            status: status,
            user: user,
            createdAt: createdAt,
            updatedAt: updatedAt,
        });
    }

    public withId(id: string): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            id: id,
        });
    }

    public withTitle(title: string): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            title: title,
        });
    }

    public withDescription(description: string): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            description: description,
        });
    }

    public withStatus(status: TaskStatus): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            status: status,
        });
    }

    public withUser(user: mongoose.Types.ObjectId): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            user: user,
        });
    }

    public withCreatedAt(createdAt: Date): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            createdAt: createdAt,
        });
    }

    public withUpdatedAt(updatedAt: Date): TaskPersistedBuilder {
        return new TaskPersistedBuilder({
            ...this,
            updatedAt: updatedAt,
        });
    }

    public build(): ITaskPersistedBuilder {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            user: this.user,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
