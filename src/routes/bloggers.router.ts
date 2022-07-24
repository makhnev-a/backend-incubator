import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers.repository";
import authMiddleware from "../middlewares/auth";
import bloggersValidator from "../validators/bloggers.validator"

export const bloggersRouter = Router({})

bloggersRouter.post(
    `/`,
    authMiddleware,
    [...bloggersValidator],
    (req: Request, res: Response) => {
        const bloggerId = Number(new Date())
        bloggersRepository.createBlogger(bloggerId, req.body.name, req.body.youtubeUrl)

        const newBlogger = bloggersRepository.findBloggerById(bloggerId)
        res.status(201).send(newBlogger)
    }
)

bloggersRouter.delete(
    `/:id`,
    authMiddleware,
    (req: Request, res: Response) => {
        const blogger = bloggersRepository.findBloggerById(+req.params.id)
        const isDeleted = bloggersRepository.removeBloggerById(+req.params.id)

        if (!blogger) {
            res.sendStatus(404)
        }

        if (!isDeleted) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }
)

bloggersRouter.put(
    `/:id`,
    authMiddleware,
    [...bloggersValidator],
    (req: Request, res: Response) => {
        const blogger = bloggersRepository.findBloggerById(+req.params.id)

        if (!blogger) {
            return res.sendStatus(404)
        }

        const isUpdated = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
)

bloggersRouter.get(
    `/`,
    authMiddleware,
    (req: Request, res: Response) => {
        const bloggers = bloggersRepository.findAllBloggers()
        res.status(200).send(bloggers)
    }
)

bloggersRouter.get(
    `/:id`,
    authMiddleware,
    (req: Request, res: Response) => {
        const blogger = bloggersRepository.findBloggerById(+req.params.id)

        if (!blogger) {
            return res.sendStatus(404)
        }
        res.send(blogger)
    }
)