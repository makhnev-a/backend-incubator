import {NextFunction, Request, Response} from "express";
import {bloggersRepository} from "../repositories/bloggers.repository";

interface IErr {
    message: string
    field: string
}

export interface CustomRequest extends Request {
    foo?: string,
    bar?: number
    err?: IErr[] | []
}

export const getErrors = (req: CustomRequest) => req.err ? req.err : []

export const titlePostMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("title" in req.body) {
        const titleTrim = req.body.title.trim()

        if (titleTrim.length === 0) {
            errors.push({
                message: "title has been required",
                field: "title"
            })
        }

        if (titleTrim.length > 30) {
            errors.push({
                message: "title length > 30 chars",
                field: "title"
            })
        }
    } else {
        errors.push({
            message: "title is not defined",
            field: "title"
        })
    }


    req.err = errors
    next()
}

export const contentPostMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("content" in req.body) {
        const contentTrim = req.body.content.trim()

        if (contentTrim.length === 0) {
            errors.push({
                message: "content has been required",
                field: "content"
            })
        }

        if (contentTrim.length > 1000) {
            errors.push({
                message: "content length > 1000 chars",
                field: "content"
            })
        }
    } else {
        errors.push({
            message: "content is not defined",
            field: "content"
        })
    }

    req.err = errors
    next()
}

export const postIdMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    if ('id' in req.params) {
        next()
        return
    }

    res.sendStatus(404)
}

export const bloggerIdPostMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("bloggerId" in req.body) {
        const blogger = bloggersRepository.findBloggerById(+req.body.bloggerId)

        if (!blogger) {
            errors.push({
                message: "blogger not found",
                field: "bloggerId"
            })
        } else {
            if (typeof req.body.bloggerId !== "number") {
                errors.push({
                    message: "bloggerId is not a number",
                    field: "bloggerId"
                })
            }
        }
    } else {
        errors.push({
            message: "bloggerId is not defined",
            field: "bloggerId"
        })
    }

    req.err = errors
    next()
}

export const shortDescPostMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("shortDescription" in req.body) {
        const shortDescriptionTrim = req.body.shortDescription.trim()

        if (shortDescriptionTrim.length === 0) {
            errors.push({
                message: "shortDescription has been required",
                field: "shortDescription"
            })
        } else {
            if (shortDescriptionTrim.length > 100) {
                errors.push({
                    message: "shortDescription length > 100 chars",
                    field: "shortDescription"
                })
            }
        }
    } else {
        errors.push({
            message: "shortDescription is not defined",
            field: "shortDescription"
        })
    }

    req.err = errors
    next()
}

export const checkErrorsMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if (errors.length > 0) {
        res.status(400).send({
            errorsMessages: errors
        })
        return
    }
    next()

}