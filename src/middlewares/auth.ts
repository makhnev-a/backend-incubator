import {NextFunction, Request, Response} from "express";
import {atob} from "buffer";
import {jwtService} from "../domain/jwt.service";
import {usersService} from "../domain/users.service";
import {LoginRequest} from "../types/request.type";
import {ObjectId} from "mongodb";

export const authJWTMiddleware = async (req: LoginRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    const token = req.headers.authorization.split(" ")[1]
    const userId: ObjectId | null = await jwtService.getUsersByToken(token)

    if (!userId) {
        return res.send(401)
    }

    req.user = await usersService.getUserById(userId)
    next()
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        let authData

        try {
            authData = atob(req.headers.authorization.replace("Basic ", ""))
        } catch (err) {
            authData = null
        }

        if (!authData) {
            return res.sendStatus(401)
        }

        const userData = authData.split(":")

        if (userData[0] !== 'admin' && userData[1] !== 'qwerty') {
            return res.sendStatus(401)
        }

        next()
    } else {
        res.sendStatus(401)
    }
}

export default authMiddleware