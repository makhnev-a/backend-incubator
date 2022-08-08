import {checkErrorsMiddleware} from "../middlewares/errors.middleware";
import {body, param} from "express-validator";

export const contentValidate = [
    body("content")
        .exists()
        .withMessage({
            message: "content is not exist",
            field: "content"
        }),
    body("content")
        .trim()
        .isLength({min: 20, max: 200})
        .withMessage({
            message: "content value < 20 chars or > 200 chars",
            field: "content"
        })
]

export default [
    ...contentValidate,
    checkErrorsMiddleware,
]