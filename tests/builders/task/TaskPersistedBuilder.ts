import mongoose from 'mongoose';
import {TaskStatus} from '../../../src/domain/entities/task/EnumTaskStatus'

export interface ITaskPersistedBuilder {
    id: string,
    title: string;
    description?: string;
    status?: TaskStatus;
    user: mongoose.Types.ObjectId;
    createdAt?: Date,
    updatedAt?: Date
}

export class TaskPersistedBuilder implements ITaskPersistedBuilder {
    id: string;
    title: string;
    description?: string | undefined;
    status?: TaskStatus | undefined;
    user: mongoose.Types.ObjectId;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    private constructor(input: ITaskPersistedBuilder){
      this.id = input.id;
      this.title = input.title;
      this.description = input.description;
      this.status = input.status;
      this.user = input.user;
      this.createdAt = input.createdAt;
      this.updatedAt = input.updatedAt;
    }

    public static aTask(){
      const id = '64a9f8b5f2a1e2b3c4d56788';
      const title = "Mocked";
      const description = "Description Mocked";
      const status = TaskStatus.IN_PROGRESS;
      const user = new mongoose.Types.ObjectId('64a9f8b5f2a1e2b3c4d56789');
      const createdAt = new Date(Date.UTC(2025, 1, 10, 11, 53));
      const updatedAt = new Date((Date.UTC(2025, 1, 10, 11, 53)));

      return new TaskPersistedBuilder({
        id: id,
        title: title,
        description: description,
        status: status,
        user: user,
        createdAt: createdAt,
        updatedAt: updatedAt
      });
    }

    public withId(id: string): TaskPersistedBuilder {
      this.id = id;
      return this;
    }

      public withTitle(title: string): TaskPersistedBuilder {
        this.title = title;
        return this;
      }
    
      public withDescription(description: string): TaskPersistedBuilder {
        this.description = description;
        return this;
      }
    
      public withStatus(status: TaskStatus): TaskPersistedBuilder {
        this.status = status;
        return this;
      }
    
      public withUser(user: mongoose.Types.ObjectId): TaskPersistedBuilder {
        this.user = user;
        return this;
      }
    
      public withCreatedAt(createdAt: Date): TaskPersistedBuilder {
        this.createdAt = createdAt;
        return this;
      }
    
      public withUpdatedAt(updatedAt: Date): TaskPersistedBuilder {
        this.updatedAt = updatedAt;
        return this;
      }

    public build(): ITaskPersistedBuilder {
        return  {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            user: this.user,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    } 
}