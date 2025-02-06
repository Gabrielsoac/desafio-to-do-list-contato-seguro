import { Task } from "../task/Task"

export type IUserProps = {
    name: string,
    email: string,
    password: string,
    tasks: Task[]
}