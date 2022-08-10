import {Request, Response, Router} from "express";
import {usersService} from "../domain/users.service";
import authMiddleware from "../middlewares/auth";
import usersValidator from "../validators/auth.validator"
import {PaginationResultType, UserMongoType, UserType} from "../repositories/mongo/types";
import {ObjectId} from "mongodb";

export const usersRouter = Router({})

usersRouter.get(
    `/`,
    async (req: Request, res: Response) => {
        const page: number = req.query.PageNumber ? +req.query.PageNumber : 1
        const pageSize: number = req.query.PageSize ? +req.query.PageSize : 10
        const users: PaginationResultType<UserType[]> = await usersService.getAllUsers(page, pageSize)

        res.status(200).send(users)
    }
)

usersRouter.post(
    `/`,
    authMiddleware,
    [...usersValidator],
    async (req: Request, res: Response) => {
        const newUser: UserType = await usersService.createUser(req.body.login, req.body.password)
        return res.status(201).send(newUser)
    }
)

usersRouter.delete(
    `/:userId`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const isUserDeleted: boolean = await usersService.removeUser(new ObjectId(req.params.userId))

        if (!isUserDeleted) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)
    }
)