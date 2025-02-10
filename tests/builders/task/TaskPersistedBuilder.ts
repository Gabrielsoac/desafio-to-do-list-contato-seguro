import {TaskStatus} from '../../../src/domain/entities/task/EnumTaskStatus'

export interface ITaskPersistedBuilder {
    title: string;
    description?: string;
    status?: TaskStatus;
    user: string;
    createdAt?: string,
    updatedAt?: string
}

export class TaskPersistedBuilder implements ITaskPersistedBuilder {

    title: string;
    description?: string | undefined;
    status?: TaskStatus | undefined;
    user: string;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;

    private constructor(input: ITaskPersistedBuilder){
        this.title = input.title;
        this.description = input.description;
        this.status = input.status;
        this.user = input.user;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static aTask(){

        const title = "Mocked";
        const description = "Description Mocked";
        const status = TaskStatus.IN_PROGRESS;
        const user = "1234567890098765432112";
        const createdAt = "09 de Fevereiro de 2025 às 22:13";
        const updatedAt = "09 de Fevereiro de 2025 às 22:13";


        return new TaskPersistedBuilder({
            title: title,
            description: description,
            status: status,
            user: user,
            createdAt: createdAt,
            updatedAt: updatedAt
        });
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
    
      public withUser(user: string): TaskPersistedBuilder {
        this.user = user;
        return this;
      }
    
      public withCreatedAt(createdAt: string): TaskPersistedBuilder {
        this.createdAt = createdAt;
        return this;
      }
    
      public withUpdatedAt(updatedAt: string): TaskPersistedBuilder {
        this.updatedAt = updatedAt;
        return this;
      }

    public build(): ITaskPersistedBuilder {
        return  {
            title: this.title,
            description: this.description,
            status: this.status,
            user: this.user,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    } 
}