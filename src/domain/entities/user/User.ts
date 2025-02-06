import { TUserProps } from "./TUserProps";

export class User {

    private props: TUserProps;

    private constructor(props: TUserProps){
        this.props = props;
    }

    public static create(
        name: string,
        email: string,
        password: string) {

        return new User({name, email, password});
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
}


