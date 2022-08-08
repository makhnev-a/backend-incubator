import {Request} from "express";
import {UserMongoType} from "../repositories/mongo/types";

interface IErr {
    message: string
    field: string
}

export interface CustomRequest extends Request {
    foo?: string,
    bar?: number
    err?: IErr[] | []
}

export interface LoginRequest extends Request {
    user?: UserMongoType | null
}