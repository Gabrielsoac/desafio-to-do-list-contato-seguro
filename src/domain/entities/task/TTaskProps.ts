import mongoose from "mongoose";
import { TaskStatus } from "./EnumTaskStatus"

export type TTaskProps = {
    title: string;
    description?: string;
    status?: TaskStatus;
    user: mongoose.Types.ObjectId;
    createdAt?: Date,
    updatedAt?: Date
}