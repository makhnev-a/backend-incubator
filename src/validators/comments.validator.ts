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

export const postIdValidator = [
    param("postId")
        .exists()
        .withMessage({
            message: "postId is not exist",
            field: "postId"
        }),
    param("postId")
        .isString()
        // .isInt({min: 1})
        .withMessage({
            message: "postId is not a string",
            field: "postId"
        }),
    // param("postId")
    //     .custom(async (postId) => {
    //         const post: PostType | null = await postsService.findPostById(postId)
    //
    //         if (!post) {
    //             throw ({
    //                 message: "postId not found",
    //                 field: "postId"
    //             })
    //         }
    //         return true
    //     })
]

export const commentIdValidator = [
    param("commentId")
        .exists()
        .withMessage({
            message: "commentId is not exist",
            field: "commentId"
        }),
]

export default [
    // ...postIdValidator,
    ...contentValidate,
    checkErrorsMiddleware,
]