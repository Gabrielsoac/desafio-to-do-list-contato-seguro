import mongoose from "mongoose"


export class CreateOutputPersistedUser {

    public static create(user: mongoose.AnyObject){

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };

    }

}