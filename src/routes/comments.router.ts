import {Request, Response, Router} from "express";
import commentsValidator from "../validators/comments.validator"

export const commentsRouter = Router({})

/** Return comment by ID */
commentsRouter.get(
    `/:commentId`,
    async (req: Request, res: Response) => {
        res.sendStatus(200)
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
    [...commentsValidator],
    async (req: Request, res: Response) => {
        res.sendStatus(200)
    }
)