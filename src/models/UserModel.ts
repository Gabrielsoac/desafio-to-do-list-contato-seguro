import { model, Schema } from "mongoose";
import { TUserProps } from "../domain/entities/user/TUserProps";

const userSchema = new Schema<TUserProps>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
    }
);

userSchema.index({email: 1}, {unique: true});

export const UserModel = model<TUserProps>('User', userSchema);

