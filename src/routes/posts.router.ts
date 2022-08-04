import {Request, Response, Router} from "express"
import authMiddleware from "../middlewares/auth"
import postsValidator from "../validators/posts.validator"
import {PostType} from "../repositories/local/posts.repository"
import {postsService} from "../domain/posts.service"

export const postsRouter = Router({})

postsRouter.post(
    `/`,
    authMiddleware,
    [...postsValidator],
    async (req: Request, res: Response) => {
        const postId = Number(new Date())
        await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId, "Andrey Makhnev", postId)

        const post: PostType | null = await postsService.findPostById(postId)
        res.status(201).send(post)
    })

postsRouter.delete(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsService.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        }

        const isDeleted: boolean = await postsService.removePostById(+req.params.id)

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
        const post: PostType | null = await postsService.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        } else {
            const isUpdated: boolean = await postsService.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

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
        const posts: PostType[] = await postsService.findAllPosts()
        res.status(200).send(posts)
    }
)

postsRouter.get(
    `/:id`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsService.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        }

        res.send(post)
    }
)