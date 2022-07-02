import {Request} from "express";

interface IErr {
    message: string
    field: string
}

export interface CustomRequest extends Request {
    foo?: string,
    bar?: number
    err?: IErr[] | []
}