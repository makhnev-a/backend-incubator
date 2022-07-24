import {body} from "express-validator";
import {checkErrorsMiddleware} from "../middlewares/errors.middleware";

const nameValidate = [
    body("name")
        .exists()
        .withMessage({
            message: "name is not exist",
            field: "name"
        }),
    body("name")
        .trim()
        .isLength({min: 1, max: 15})
        .withMessage({
            message: "name value > 15 chars",
            field: "name"
        })
]

const youtubeUrlValidate = [
    body("youtubeUrl")
        .exists()
        .withMessage({
            message: "youtubeUrl is not exist",
            field: "youtubeUrl"
        }),
    body("youtubeUrl")
        .trim()
        .isLength({min: 1, max: 100})
        .withMessage({
            "message": "youtubeUrl length > 100 chars",
            "field": "youtubeUrl"
        }),
    body("youtubeUrl")
        .trim()
        .isURL()
        .withMessage({
            "message": "youtubeUrl is not URL value",
            "field": "youtubeUrl"
        }),
    body("youtubeUrl")
        .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
        .withMessage({
            "message": "youtubeUrl bad url",
            "field": "youtubeUrl"
        }),
]

export default [
    ...nameValidate,
    ...youtubeUrlValidate,
    checkErrorsMiddleware,
]