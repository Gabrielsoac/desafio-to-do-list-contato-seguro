import mongoose from "mongoose";

export type TRequestCreateTaskDto = {
    title: string,
    description?: string,
    user: mongoose.Types.ObjectId;
}

