import {UserMongoType} from "../repositories/mongo/types";
import jwt from "jsonwebtoken"
import {config} from "../config";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT(user: UserMongoType) {
        const token = jwt.sign({userId: user._id}, config.secretJWT, {expiresIn: "1h"})

        return {
            resultCode: 0,
            data: {
                token
            }
        }
    },
    async getUsersByToken(token: string) {
        try {
            const result: any = jwt.verify(token, config.secretJWT)
            console.log(result.userId)
            debugger
            return new ObjectId(result.userId)
        } catch (err) {
            return null
        }
    }
}