import mongoose from "mongoose";
import { TTaskProps } from "./TTaskProps";

export class Task {

    private props: TTaskProps;

    private constructor(props: TTaskProps) {
        this.props = props;
    }

    public static create(
        title: string,
        description: string,
        user: mongoose.Types.ObjectId){
            
        return new Task({title, description, user});
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



