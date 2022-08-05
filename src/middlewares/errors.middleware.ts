import {CustomRequest} from "../types/request.type"
import {NextFunction, Response} from "express"
import {validationResult} from "express-validator"

export const checkErrorsMiddleware = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return error.msg
        }
    })
    const errorsResult = myValidationResult(req)
    debugger
    if (!errorsResult.isEmpty()) {
        return res.status(400).send({
            errorsMessages: Object.values(errorsResult.mapped())
        })
    }
    next()
}