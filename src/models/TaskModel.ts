import { model, Schema } from "mongoose"
import { TTaskProps } from "../domain/entities/task/TTaskProps"
import { TaskStatus } from "../domain/entities/task/EnumTaskStatus";

const taskSchema = new Schema<TTaskProps>(
    {
        title: {type: String, required: true },
        description: {type: String, required: false},
        status: {
            type: String,
            enum: Object.values(TaskStatus),
            required: true,
            default: TaskStatus.PENDING,
        },
    }, { timestamps: true }
);

const TaskModel = model<TTaskProps>('Task', taskSchema);

export { TaskModel };