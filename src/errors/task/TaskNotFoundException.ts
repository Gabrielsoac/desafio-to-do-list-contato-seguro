import { StatusCodes } from "http-status-codes";

export class UserNotFoundError extends Error {
    
    public statusCode: number;
    public name: string
    
    constructor(message: string){
        super(message);
        this.name = 'Task Not Found';
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}