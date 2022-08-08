import {Request, Response, Router} from "express";
import commentsValidator from "../validators/comments.validator"
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

        await commentsService.removeComment(req.params.commentId)
        return res.sendStatus(204)
    }
)