import {Response, Router} from "express"
import authValidator from "../validators/auth.validator"
import {jwtService} from "../domain/jwt.service";
import {loginUserMiddleware} from "../middlewares/auth";
import {LoginRequest} from "../types/request.type";

export const authRouter = Router({})

authRouter.post(
    `/login`,
    loginUserMiddleware,
    [...authValidator],
    async (req: LoginRequest, res: Response) => {
        if (req.user) {
            const token = await jwtService.createJWT(req.user)
            res.status(200).send(token)
        }
    }
)