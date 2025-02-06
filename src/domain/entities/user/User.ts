import { Task } from "../task/Task"
import { TUserProps } from "./TUserProps";

export class User {

    private props: TUserProps;

    private constructor(props: TUserProps){
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


