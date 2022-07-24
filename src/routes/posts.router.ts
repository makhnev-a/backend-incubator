import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts.repository";
import authMiddleware from "../middlewares/auth";
import postsValidator from "../validators/posts.validator"

export const postsRouter = Router({})

postsRouter.post(
    `/`,
    authMiddleware,
    [...postsValidator],
    (req: Request, res: Response) => {
        const postId = Number(new Date())
        postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId, "Andrey Makhnev", postId)

        const post = postsRepository.findPostById(postId)
        res.status(201).send(post)
    })

postsRouter.delete(
    `/:id`,
    authMiddleware,
    (req: Request, res: Response) => {
        const post = postsRepository.findPostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        }

        const isDeleted: boolean = postsRepository.removePostById(+req.params.id)

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
    (req: Request, res: Response) => {
        const post = postsRepository.findPostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        } else {
            const isUpdated: boolean = postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

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
    (req: Request, res: Response) => {
        const posts = postsRepository.findAllPosts()
        res.status(200).send(posts)
    }
)

postsRouter.get(
    `/:id`,
    authMiddleware,
    (req: Request, res: Response) => {
        const post = postsRepository.findPostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        }
        res.send(post)
    }
)