import { User } from "../../../src/domain/entities/user/User";

export interface IUserBuilder {
    name: string;
    email: string;
    password: string
}

export class UserBuilder implements IUserBuilder {
    
    name: string;
    email: string;
    password: string;

    private constructor(name: string, email: string, password: string){
        this. name = name;
        this.email = email;
        this.password = password;
    }

    public static aUser(){

        const name = 'João da Silva';
        const email = 'joaodasilva@teste.com';
        const password = '1234@Joaozinho';

        return new UserBuilder(name, email, password);
    }

    public withName(name: string): UserBuilder {
        this.name = name;
        return this;
    }

    public withEmail(email: string): UserBuilder {
        this.email = email;
        return this;
    }

    public withPassword(password: string): UserBuilder {
        this.password = password;
        return this;
    }

    public build(): User {
        return User.create(
            this.name,
            this.email,
            this.password
        );
    }
} 