import { User } from "../user/User"
import { TaskStatus } from "./EnumTaskStatus"

export type TTaskProps = {
    title: string;
    description?: string;
    status: TaskStatus;
    user: User;
}