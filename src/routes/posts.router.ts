import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/mongo/posts.repository";
import authMiddleware from "../middlewares/auth";
import postsValidator from "../validators/posts.validator"
import {PostType} from "../repositories/local/posts.repository";

export const postsRouter = Router({})

postsRouter.post(
    `/`,
    authMiddleware,
    [...postsValidator],
    async (req: Request, res: Response) => {
        const postId = Number(new Date())
        await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId, "Andrey Makhnev", postId)

        const post: PostType | null = await postsRepository.findPostById(postId)
        res.status(201).send(post)
    })

postsRouter.delete(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsRepository.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        }

        const isDeleted: boolean = await postsRepository.removePostById(+req.params.id)

        if (!isDeleted) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }
)

postsRouter.put(
    `/:id`,
    authMiddleware,
    [...postsValidator],
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsRepository.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        } else {
            const isUpdated: boolean = await postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

            if (isUpdated) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        }
    }
)

postsRouter.get(
    `/`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const posts: PostType[] = await postsRepository.findAllPosts()
        res.status(200).send(posts)
    }
)

postsRouter.get(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsRepository.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        }

        res.send(post)
    }
)