import mongoose from "mongoose";

export interface IRequestCreateTaskDto {
    title: string,
    description?: string,
    user: mongoose.Types.ObjectId;
}

