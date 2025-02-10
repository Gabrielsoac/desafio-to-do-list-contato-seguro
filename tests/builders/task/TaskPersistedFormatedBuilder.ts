import mongoose from 'mongoose';
import {TaskStatus} from '../../../src/domain/entities/task/EnumTaskStatus'

export interface ITaskPersistedBuilder {
    id: string,
    title: string;
    description?: string;
    status?: TaskStatus;
    user: mongoose.Types.ObjectId;
    createdAt?: string,
    updatedAt?: string
}

export class TaskPersistedFormatedBuilder implements ITaskPersistedBuilder {
    id: string;
    title: string;
    description?: string | undefined;
    status?: TaskStatus | undefined;
    user: mongoose.Types.ObjectId;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;

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
      const status = TaskStatus.PENDING;
      const user = new mongoose.Types.ObjectId('64a9f8b5f2a1e2b3c4d56789');
      const createdAt = '10 de Fevereiro de 2025 às 11:53';
      const updatedAt = '10 de Fevereiro de 2025 às 11:53';

      return new TaskPersistedFormatedBuilder({
        id: id,
        title: title,
        description: description,
        status: status,
        user: user,
        createdAt: createdAt,
        updatedAt: updatedAt
      });
    }

    public withId(id: string): TaskPersistedFormatedBuilder {
      this.id = id;
      return this;
    }

      public withTitle(title: string): TaskPersistedFormatedBuilder {
        this.title = title;
        return this;
      }
    
      public withDescription(description: string): TaskPersistedFormatedBuilder {
        this.description = description;
        return this;
      }
    
      public withStatus(status: TaskStatus): TaskPersistedFormatedBuilder {
        this.status = status;
        return this;
      }
    
      public withUser(user: mongoose.Types.ObjectId): TaskPersistedFormatedBuilder {
        this.user = user;
        return this;
      }
    
      public withCreatedAt(createdAt: string): TaskPersistedFormatedBuilder {
        this.createdAt = createdAt;
        return this;
      }
    
      public withUpdatedAt(updatedAt: string): TaskPersistedFormatedBuilder {
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