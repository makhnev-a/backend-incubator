import {Request, Response, Router} from "express"
import authMiddleware from "../middlewares/auth"
import bloggersValidator from "../validators/bloggers.validator"
import {contentValidate, shortDescriptionValidate, titleValidate} from "../validators/posts.validator"
import {bloggersService} from "../domain/bloggers.service"
import {PaginationResultType} from "../repositories/mongo/types";
import {BloggerType, PostType} from "../repositories/types";
import {postsService} from "../domain/posts.service";
import {checkErrorsMiddleware} from "../middlewares/errors.middleware";

export const bloggersRouter = Router({})

bloggersRouter.post(
    `/:bloggerId/posts`,
    authMiddleware,
    titleValidate,
    shortDescriptionValidate,
    contentValidate,
    checkErrorsMiddleware,
    async (req: Request, res: Response) => {
        const blogger: BloggerType | null = await bloggersService.findBloggerById(req.params.bloggerId)

        if (!blogger) {
            return res.sendStatus(404)
        }
        const post: PostType | null = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.params.bloggerId, "Andrey Makhnev")

        if (!post) {
            return res.sendStatus(404)
        }

        res.status(201).send(post)
    }
)

bloggersRouter.post(
    `/`,
    authMiddleware,
    [...bloggersValidator],
    async (req: Request, res: Response) => {
        const newBlogger: BloggerType | null = await bloggersService.createBlogger(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
    }
)

bloggersRouter.delete(
    `/:bloggerId`,
    authMiddleware,
    async (req: Request, res: Response) => {
        const blogger: BloggerType | null = await bloggersService.findBloggerById(req.params.bloggerId)

        if (!blogger) {
            return res.sendStatus(404)
        }

        const isDeleted: boolean = await bloggersService.removeBloggerById(req.params.bloggerId)

        if (!isDeleted) {
            return res.sendStatus(404)
        } else {
            return res.sendStatus(204)
        }
    }
)

bloggersRouter.put(
    `/:bloggerId`,
    authMiddleware,
    [...bloggersValidator],
    async (req: Request, res: Response) => {
        const blogger: BloggerType | null = await bloggersService.findBloggerById(req.params.bloggerId)

        if (!blogger) {
            return res.sendStatus(404)
        }

        const isUpdated: boolean = await bloggersService.updateBlogger(req.params.bloggerId, req.body.name, req.body.youtubeUrl)

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
)

bloggersRouter.get(
    `/`,
    async (req: Request, res: Response) => {
        const {PageNumber, PageSize, SearchNameTerm} = req.query
        const page = PageNumber ? PageNumber : 1
        const pageSize = PageSize ? PageSize : 10
        const searchName = SearchNameTerm ? String(SearchNameTerm) : ""
        const result: PaginationResultType<BloggerType[]> = await bloggersService.findAllBloggers(+page, +pageSize, searchName)

        res.status(200).send(result)
    }
)

bloggersRouter.get(
    `/:id`,
    async (req: Request, res: Response) => {
        const blogger: BloggerType | null = await bloggersService.findBloggerById(req.params.id)

        if (!blogger) {
            return res.sendStatus(404)
        }
        res.send(blogger)
    }
)

bloggersRouter.get(
    `/:bloggerId/posts`,
    async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const page = PageNumber ? PageNumber : 1
        const pageSize = PageSize ? PageSize : 10
        const blogger: BloggerType | null = await bloggersService.findBloggerById(req.params.bloggerId)

        if (!blogger) {
            return res.sendStatus(404)
        }

        const posts: PaginationResultType<PostType[]> = await bloggersService.findPostsFromBloggers(+page, +pageSize, req.params.bloggerId)
        res.status(200).send(posts)
    }
)