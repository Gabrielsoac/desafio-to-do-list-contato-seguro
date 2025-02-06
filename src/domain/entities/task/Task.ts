import { User } from "../user/User";
import { TaskStatus } from "./EnumTaskStatus";
import { ITaskProps } from "./ITaskProps";

export class Task {

    private props: ITaskProps;

    private constructor(props: ITaskProps) {
        this.props = props;
    }

    public static create(
        title: string,
        description: string,
        status: TaskStatus,
        user: User){

        return new Task({title, description, status, user});
    }

    public static createWith(props: ITaskProps){
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



