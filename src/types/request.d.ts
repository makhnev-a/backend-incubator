import {UserMongoType} from "../repositories/mongo/types"

declare global {
    declare namespace Express {
        export interface Request {
            user: UserMongoType | null
        }
    }
}