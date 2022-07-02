import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts.repository";
import authMiddleware from "../middlewares/auth";
import {
    bloggerIdPostMiddleware,
    contentPostMiddleware,
    postIdMiddleware,
    shortDescPostMiddleware,
    titlePostMiddleware
} from "../middlewares/posts.middleware";
import {checkErrorsMiddleware} from "../middlewares/errors.middleware";

export const postsRouter = Router({})

postsRouter.post(
    `/`,
    authMiddleware,
    titlePostMiddleware,
    shortDescPostMiddleware,
    contentPostMiddleware,
    bloggerIdPostMiddleware,
    checkErrorsMiddleware,
    (req: Request, res: Response) => {
        const postId = Number(new Date())
        postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId, "Andrey Makhnev", postId)

        const post = postsRepository.findPostById(postId)
        res.status(201).send(post)
    })

postsRouter.delete(
    `/:id`,
    authMiddleware,
    postIdMiddleware,
    (req: Request, res: Response) => {
        const post = postsRepository.findPostById(+req.params.id)
        const isDeleted: boolean = postsRepository.removePostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        }

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
    titlePostMiddleware,
    shortDescPostMiddleware,
    contentPostMiddleware,
    bloggerIdPostMiddleware,
    checkErrorsMiddleware,
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
    postIdMiddleware,
    (req: Request, res: Response) => {
        const post = postsRepository.findPostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        }
        res.send(post)
    }
)