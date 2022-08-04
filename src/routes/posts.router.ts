import {Request, Response, Router} from "express"
import authMiddleware from "../middlewares/auth"
import postsValidator from "../validators/posts.validator"
import {postsService} from "../domain/posts.service"
import {PaginationResultType} from "../repositories/mongo/types";
import { PostType } from "../repositories/types";

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
    async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const page = PageNumber ? PageNumber : 1
        const pageSize = PageSize ? PageSize : 10
        const posts: PaginationResultType<PostType[]> = await postsService.findAllPosts(+page, +pageSize)

        res.status(200).send(posts)
    }
)

postsRouter.get(
    `/:id`,
    async (req: Request, res: Response) => {
        const post: PostType | null = await postsService.findPostById(+req.params.id)

        if (!post) {
            return res.sendStatus(404)
        }

        res.send(post)
    }
)