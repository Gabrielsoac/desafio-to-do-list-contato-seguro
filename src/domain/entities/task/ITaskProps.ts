import { User } from "../user/User"
import { TaskStatus } from "./EnumTaskStatus"

export type ITaskProps = {
    title: string;
    description?: string;
    status: TaskStatus;
    user: User;
}