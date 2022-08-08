import {Request, Response, Router} from "express"
import authValidator from "../validators/auth.validator"
import {usersService} from "../domain/users.service";

export const authRouter = Router({})

authRouter.post(
    `/login`,
    [...authValidator],
    async (req: Request, res: Response) => {
        const checkResult: boolean = await usersService.checkCredentials(req.body.login, req.body.password)

        if (!checkResult) {
            return res.sendStatus(401)
        }

        res.status(200).send(`Welcome ${req.body.login}!`)
    }
)