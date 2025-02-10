export interface IUserPersistedBuilder {
    id: string
    name: string;
    email: string;
    password: string
}

export class UserPersistedBuilder implements IUserPersistedBuilder {
    
    id: string
    name: string;
    email: string;
    password: string;

    private constructor(id: string, name: string, email: string, password: string){
        
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static aUser(){

        const id = '123456789';
        const name = 'João da Silva';
        const email = 'joaodasilva@teste.com';
        const password = '1234@Joaozinho';

        return new UserPersistedBuilder(id, name, email, password);
  
    }

    public withId(id: string): UserPersistedBuilder {
        this.id = id;
        return this;
    }

    public withName(name: string): UserPersistedBuilder {
        this.name = name;
        return this;
    }

    public withEmail(email: string): UserPersistedBuilder {
        this.email = email;
        return this;
    }

    public withPassword(password: string): UserPersistedBuilder {
        this.password = password;
        return this;
    }

    public build(): IUserPersistedBuilder {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
} 