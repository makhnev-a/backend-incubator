import {Request, Response, Router} from "express"
import authValidator from "../validators/auth.validator"

export const authRouter = Router({})

authRouter.post(
    `/login`,
    [...authValidator],
    async (req: Request, res: Response) => {
        res.sendStatus(200)
    }
)