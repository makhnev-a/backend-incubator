import {body} from "express-validator"
import {bloggersService} from "../domain/bloggers.service"
import {checkErrorsMiddleware} from "../middlewares/errors.middleware"
import {BloggerType} from "../repositories/types";

export const titleValidate = [
    body("title")
        .exists()
        .withMessage({
            message: "title is not exist",
            field: "title"
        }),
    body("title")
        .trim()
        .isLength({min: 1, max: 30})
        .withMessage({
            message: "title length > 30 chars",
            field: "title"
        }),
]

export const shortDescriptionValidate = [
    body("shortDescription")
        .exists()
        .withMessage({
            message: "shortDescription is not exist",
            field: "shortDescription"
        }),
    body("shortDescription")
        .trim()
        .isLength({min: 1, max: 100})
        .withMessage({
            message: "shortDescription length > 100 chars",
            field: "shortDescription"
        }),
]

export const contentValidate = [
    body("content")
        .exists()
        .withMessage({
            message: "content is not exist",
            field: "content"
        }),
    body("content")
        .trim()
        .isLength({min: 1, max: 1000})
        .withMessage({
            message: "content length > 1000 chars",
            field: "content"
        }),
]

export const bloggerIdValidate = [
    body("bloggerId")
        .exists()
        .withMessage({
            message: "bloggerId is not exist",
            field: "bloggerId"
        }),
    body("bloggerId")
        .isString()
        .withMessage({
            message: "bloggerId is not a string",
            field: "bloggerId"
        }),
    body("bloggerId")
        .custom(async (value) => {
            const blogger: BloggerType | null = await bloggersService.findBloggerById(value)

            if (!blogger) {
                throw ({
                    message: "blogger not found",
                    field: "bloggerId"
                })
            }
            return true
        }),
]

export default [
    ...titleValidate,
    ...shortDescriptionValidate,
    ...contentValidate,
    ...bloggerIdValidate,
    checkErrorsMiddleware
]