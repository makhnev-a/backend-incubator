
import {NextFunction, Request, Response} from "express";
import { getErrors } from "../helpers/getErrors";
import { CustomRequest } from "../types/request.type";

export const nameBloggerMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)

    if ("name" in req.body) {
        const nameTrim = req.body.name.trim()

        if (nameTrim.length === 0) {
            errors.push({
                "message": "name not required",
                "field": "name"
            })
        }
        if (nameTrim.length > 15) {
            errors.push({
                "message": "name length > 15",
                "field": "name"
            })
        }
    } else {
        errors.push({
            "message": "field name not found",
            "field": "name"
        })
    }

    req.err = errors
    next()
}

export const youtubeUrlBloggerMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = getErrors(req)
    const regexpURL = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

    if ("youtubeUrl" in req.body) {
        const urlTrim = req.body.youtubeUrl.trim()

        if (urlTrim.length === 0) {
            errors.push({
                "message": "youtubeUrl not reqiured",
                "field": "youtubeUrl"
            })
        } else {
            if (!regexpURL.test(urlTrim)) {
                errors.push({
                    "message": "youtubeUrl bad url",
                    "field": "youtubeUrl"
                })
            }
            if (urlTrim.length > 100) {
                errors.push({
                    "message": "youtubeUrl length > 100 chars",
                    "field": "youtubeUrl"
                })
            }
        }
    } else {
        errors.push({
            "message": "field youtubeUrl not found",
            "field": "youtubeUrl"
        })
    }

    req.err = errors
    next()
}

export const bloggerIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ("id" in req.params) {
        next()
        return
    }

    res.sendStatus(404)
}