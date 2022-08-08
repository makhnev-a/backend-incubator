import {Request, Response, Router} from "express"
import authValidator from "../validators/auth.validator"
import {usersService} from "../domain/users.service";
import {UserMongoType} from "../repositories/mongo/types";
import {jwtService} from "../domain/jwt.service";

export const authRouter = Router({})

authRouter.post(
    `/login`,
    [...authValidator],
    async (req: Request, res: Response) => {
        const user: UserMongoType | null = await usersService.checkCredentials(req.body.login, req.body.password)

        if (!user) {
            return res.sendStatus(401)
        }

        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    }
)