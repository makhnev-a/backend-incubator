import {CustomRequest} from "../types/request.type";
import {NextFunction, Response} from "express";
import { getErrors } from "../helpers/getErrors";

export const checkErrorsMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const errors = getErrors(req)

    if (errors.length > 0) {
        res.status(400).send({
            errorsMessages: errors
        })
        return
    }
    next()
}