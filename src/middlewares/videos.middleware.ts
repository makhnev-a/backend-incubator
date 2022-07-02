import {CustomRequest, getErrors} from "./posts.middleware";
import {NextFunction, Request, Response} from "express";

export const titleVidelMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("title" in req.body) {
        const titleTrim = req.body.title.trim()

        if (titleTrim > 40) {
            errors.push({
                "message": "The Title field length max 40 chars.",
                "field": "title"
            })
        }
    } else {
        errors.push({
            "message": "The Title field is required.",
            "field": "title"
        })
    }

    if (req.body.title) {
        if (req.body.title.length < 40) {

        } else {
            res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "The Title field length max 40 chars.",
                        "field": "title"
                    }
                ]
            })
        }
    } else {
        res.status(400).json({
            "errorsMessages": [
                {
                    "message": "The Title field is required.",
                    "field": "title"
                }
            ]
        })
    }

    req.err = errors
    next()
}

export const videoIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ("id" in req.params) {
        next()
        return
    }

    res.sendStatus(404)
}