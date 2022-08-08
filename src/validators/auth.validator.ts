import {body} from "express-validator";
import {checkErrorsMiddleware} from "../middlewares/errors.middleware";

export const loginValidate = [
    body("login")
        .exists()
        .withMessage({
            message: "login is not exist",
            field: "login"
        }),
    body("login")
        .trim()
        .isLength({min: 3, max: 10})
        .withMessage({
            message: "login value < 3 chars or > 10 chars",
            field: "login"
        })
]

export const passwordValidate = [
    body("password")
        .exists()
        .withMessage({
            message: "password is not exist",
            field: "password"
        }),
    body("password")
        .trim()
        .isLength({min: 6, max: 20})
        .withMessage({
            message: "password value < 6 chars or > 20 chars",
            field: "password"
        })
]

export default [
    ...loginValidate,
    ...passwordValidate,
    checkErrorsMiddleware,
]