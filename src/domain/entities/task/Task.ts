import { User } from "../user/User";
import { TaskStatus } from "./EnumTaskStatus";
import { TTaskProps } from "./TTaskProps";

export class Task {

    private props: TTaskProps;

    private constructor(props: TTaskProps) {
        this.props = props;
    }

    public static create(
        title: string,
        description: string,
        user: User,
        status: TaskStatus){
            
        return new Task({title, description, status, user });
    }

    public static createWith(props: TTaskProps){
        return new Task(props);
    }

    public getTitle(){
        return this.props.title;
    }

    public getDescription(){
        return this.props.description;
    }

    public getstatus(){
        return this.props.status;
    }

    public getUser(){
        return this.props.user
    }
}



