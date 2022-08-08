import {Request, Response, Router} from "express"
import authMiddleware, {authJWTMiddleware} from "../middlewares/auth"
import postsValidator from "../validators/posts.validator"
import commentsValidator from "../validators/comments.validator"
import {postsService} from "../domain/posts.service"
import {CommentType, PaginationResultType} from "../repositories/mongo/types"
import {BloggerType, PostType} from "../repositories/types"
import {bloggersService} from "../domain/bloggers.service"
import {commentsService} from "../domain/comments.service"
import {LoginRequest} from "../types/request.type";

export const postsRouter = Router({})

postsRouter.post(
    `/`,
    authMiddleware,
    [...postsValidator],
    async (req: Request, res: Response) => {
        const postId = Number(new Date())
        const blogger: BloggerType | null = await bloggersService.findBloggerById(+req.body.bloggerId)

        if (!blogger) {
            return res.sendStatus(404)
        }

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
            const blogger: BloggerType | null = await bloggersService.findBloggerById(+req.body.bloggerId)

            if (!blogger) {
                return res.sendStatus(404)
            }

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

postsRouter.post(
    `/:postId/comments`,
    authJWTMiddleware,
    [...commentsValidator],
    async (req: LoginRequest, res: Response) => {
        const post: PostType | null = await postsService.findPostById(+req.params.postId)

        if (!post) {
            return res.sendStatus(404)
        }

        const newComment = {
            content: req.body.content,
            userId: req.user?._id,
            userLogin: req.user?.login,
            addedAt: new Date()
        }

        const comment: CommentType | null = await commentsService.createComment(newComment)
        // const comment: CommentType | null = await commentsService.createComment(req.body.content, req.user?._id, req.user?.login, new Date())
        res.status(201).send(comment)
    }
)