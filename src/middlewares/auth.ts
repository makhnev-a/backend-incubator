import {NextFunction, Request, Response} from "express";
import {atob} from "buffer";

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