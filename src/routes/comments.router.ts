import {Request, Response, Router} from "express";
import commentsValidator, {commentIdValidator, contentValidate} from "../validators/comments.validator"
import {CommentType} from "../repositories/mongo/types";
import {commentsService} from "../domain/comments.service";
import {authJWTMiddleware} from "../middlewares/auth";
import {LoginRequest} from "../types/request.type";
import {ObjectId} from "mongodb";

export const commentsRouter = Router({})

/** Return comment by ID */
commentsRouter.get(
    `/:commentId`,
    async (req: Request, res: Response) => {
        const comment: CommentType | null = await commentsService.findCommentById(req.params.commentId)

        if (!comment) {
            return res.sendStatus(404)
        }

        res.status(200).send(comment)
    }
)

/** Update comment by ID */
commentsRouter.get(
    `/:commentId`,
    [...commentsValidator],
    async (req: Request, res: Response) => {
        res.sendStatus(200)
    }
)

/** Delete comment by ID */
commentsRouter.delete(
    `/:commentId`,
    authJWTMiddleware,
    async (req: LoginRequest, res: Response) => {
        const comment: CommentType | null = await commentsService.findCommentById(req.params.commentId)

        if (!comment) {
            return res.sendStatus(404)
        }

        if (new ObjectId(comment.userId).toString() !== new ObjectId(req.user?._id).toString()) {
            return res.sendStatus(403)
        }

        const isDeleted: boolean = await commentsService.removeComment(req.params.commentId)

        if (isDeleted) {
            return res.sendStatus(204)
        }

        return res.sendStatus(404)
    }
)

commentsRouter.put(
    `/:commentId`,
    authJWTMiddleware,
    contentValidate,
    async (req: LoginRequest, res: Response) => {
        const comment: CommentType | null = await commentsService.findCommentById(req.params.commentId)

        if (!comment) {
            return res.sendStatus(404)
        }

        if (new ObjectId(comment.userId).toString() !== new ObjectId(req.user?._id).toString()) {
            return res.sendStatus(403)
        }

        const isUpdated: boolean = await commentsService.updateComment(req.params.commentId, req.body.content)

        if (isUpdated) {
            return res.sendStatus(204)
        }

        return res.sendStatus(404)
    }
)