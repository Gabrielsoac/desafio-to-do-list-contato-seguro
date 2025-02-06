import { IUseCase } from "../../IUseCase";
import { IRequestCreateTaskDto } from "./IRequestCreateTaskDto";
import { IResponseCreateTaskDto } from "./IResponseCreateTaskDto";

export class CreateTask implements IUseCase<IRequestCreateTaskDto, IResponseCreateTaskDto> {
   
    

    execute(input: IRequestCreateTaskDto): Promise<IResponseCreateTaskDto> {
        throw new Error("Method not implemented.");
    }
}