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

    if (!errorsResult.isEmpty()) {
        const errArrays = Object.values(errorsResult.mapped())

        // Not working !!!

        // if (errArrays[0].field === "login" || errArrays[0].field === "password") {
        //     return res.status(401).send({
        //         errorsMessages: errArrays
        //     })
        // }

        return res.status(400).send({
            errorsMessages: errArrays
        })
    }
    next()
}