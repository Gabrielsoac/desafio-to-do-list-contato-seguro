import { StatusCodes } from "http-status-codes";

export class UserAlreadyExistsError extends Error {
    
    public statusCode: number;
    public name: string
    
    constructor(message: string){
        super(message);
        this.name = 'User Already Exists';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}