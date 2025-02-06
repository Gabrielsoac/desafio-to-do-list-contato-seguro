import { Task } from "../task/Task"

export type TUserProps = {
    name: string,
    email: string,
    password: string,
    tasks: Task[]
}