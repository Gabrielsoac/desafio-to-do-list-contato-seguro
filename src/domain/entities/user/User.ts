import { Task } from "../task/Task"

export type IUserProps = {
    name: string,
    email: string,
    password: string,
    tasks: Task[]
}

export class User {

    private props: IUserProps;

    private constructor(props: IUserProps){
        this.props = props;
    }

    public static create(
        name: string,
        email: string,
        password: string,
        tasks: Task[]) {

        return new  User({name, email, password, tasks});
    }

    public getName(){
        return this.props.name;
    }


    public getEmail(){
        return this.props.email;
    }


    public getPassword(){
        return this.props.password;
    }


    public getTasks(){
        return this.props.tasks;
    }

}


