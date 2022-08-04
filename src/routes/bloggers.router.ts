import {Request, Response, Router} from "express";
import {bloggersRepository, BloggerType} from "../repositories/local/bloggers.repository";
import authMiddleware from "../middlewares/auth";
import bloggersValidator from "../validators/bloggers.validator"

export const bloggersRouter = Router({})

bloggersRouter.post(
    `/`,
    authMiddleware,
    [...bloggersValidator],
    async (req: Request, res: Response) => {
        const bloggerId = Number(new Date())
        await bloggersRepository.createBlogger(bloggerId, req.body.name, req.body.youtubeUrl)

        const newBlogger: BloggerType | undefined = await bloggersRepository.findBloggerById(bloggerId)
        res.status(201).send(newBlogger)
    }
)

bloggersRouter.delete(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const blogger: BloggerType | undefined = await bloggersRepository.findBloggerById(+req.params.id)

        if (!blogger) {
            res.sendStatus(404)
        }

        const isDeleted: boolean = await bloggersRepository.removeBloggerById(+req.params.id)

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
    async (req: Request, res: Response) => {
        const blogger: BloggerType | undefined = await bloggersRepository.findBloggerById(+req.params.id)

        if (!blogger) {
            return res.sendStatus(404)
        }

        const isUpdated: boolean = await bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)

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
    async (req: Request, res: Response) => {
        const bloggers: BloggerType[] = await bloggersRepository.findAllBloggers()
        res.status(200).send(bloggers)
    }
)

bloggersRouter.get(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const blogger: BloggerType | undefined = await bloggersRepository.findBloggerById(+req.params.id)

        if (!blogger) {
            return res.sendStatus(404)
        }
        res.send(blogger)
    }
)