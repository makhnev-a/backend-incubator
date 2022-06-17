import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {bloggersRepository} from "../repositories/bloggers.repository";

export const postsRouter = Router({})

postsRouter.post(`/`, (req: Request, res: Response) => {
    let errors: { message: string; field: string; }[] = []

    if ("title" in req.body) {
        const titleTrim = req.body.title.trim()
        if (titleTrim.length === 0) {
            errors.push({
                message: "title has been required",
                field: "title"
            })
        } else {
            if (titleTrim.length > 30) {
                errors.push({
                    message: "title length > 30 chars",
                    field: "title"
                })
            }
        }
    } else {
        errors.push({
            message: "title not found",
            field: "title"
        })
    }

    if ("shortDescription" in req.body) {
        const shortDescriptionTrim = req.body.shortDescription.trim()
        if (shortDescriptionTrim.length === 0) {
            errors.push({
                message: "shortDescription has been required",
                field: "shortDescription"
            })
        } else {
            if (shortDescriptionTrim.length > 100) {
                errors.push({
                    message: "shortDescription length > 100 chars",
                    field: "shortDescription"
                })
            }
        }
    } else {
        errors.push({
            message: "shortDescription not found",
            field: "shortDescription"
        })
    }

    if ("content" in req.body) {
        const contentTrim = req.body.content.trim()
        if (contentTrim.length === 0) {
            errors.push({
                message: "content has been required",
                field: "content"
            })
        } else {
            if (contentTrim.length > 1000) {
                errors.push({
                    message: "content length > 1000 chars",
                    field: "content"
                })
            }
        }
    } else {
        errors.push({
            message: "content not found",
            field: "content"
        })
    }

    if ("bloggerId" in req.body) {
        const post = bloggersRepository.findBloggerById(+req.body.bloggerId)

        if (!post) {
            errors.push({
                message: "post not found",
                field: "bloggerId"
            })
        } else {
            if (typeof req.body.bloggerId !== "number") {
                errors.push({
                    message: "bloggerId is not a number",
                    field: "bloggerId"
                })
            }
        }
    } else {
        errors.push({
            message: "bloggerId not found",
            field: "bloggerId"
        })
    }

    if (errors.length > 0) {
        res.status(400).send({
            errorsMessages: errors
        })
    }

    if (req.body.title && req.body.shortDescription && req.body.content && req.body.bloggerId) {
        const id = Number(new Date())
        postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, +req.body.bloggerId, "Andrey Makhnev", id)
        const post = postsRepository.findPostById(id)
        res.status(201).send(post)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "The all fields has been required.",
                    "field": "title, shortDescription, content, bloggerId"
                }
            ]
        })
    }
})

postsRouter.delete(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
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
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put(`/:id`, (req: Request, res: Response) => {
    let errors = []
    const post = postsRepository.findPostById(+req.params.id)

    if (!post) {
        res.sendStatus(404)
    } else {
        if ("title" in req.body) {
            const newTitle = req.body.title.trim()

            if (newTitle.length === 0) {
                errors.push({
                    message: "title has been required",
                    field: "title"
                })
            } else {
                if (newTitle.length > 30) {
                    errors.push({
                        message: "title length > 30 chars",
                        field: "title"
                    })
                }
            }
        } else {
            errors.push({
                message: "title is not defined",
                field: "title"
            })
        }

        if ("shortDescription" in req.body) {
            const newShortDescription = req.body.shortDescription.trim()

            if (newShortDescription.length === 0) {
                errors.push({
                    message: "shortDescription has been required",
                    field: "shortDescription"
                })
            } else {
                if (newShortDescription.length > 100) {
                    errors.push({
                        message: "shortDescription length > 100 chars",
                        field: "shortDescription"
                    })
                }
            }
        } else {
            errors.push({
                message: "shortDescription is not defined",
                field: "shortDescription"
            })
        }

        if ("content" in req.body) {
            const newContent = req.body.content.trim()

            if (newContent.length === 0) {
                errors.push({
                    message: "content has been required",
                    field: "content"
                })
            } else {
                if (newContent.length > 1000) {
                    errors.push({
                        message: "content length > 1000 chars",
                        field: "content"
                    })
                }
            }
        } else {
            errors.push({
                message: "content is not defined",
                field: "content"
            })
        }

        if ("bloggerId" in req.body) {
            const blogger = bloggersRepository.findBloggerById(+req.body.bloggerId)

            if (!blogger) {
                errors.push({
                    message: "blogger not found",
                    field: "bloggerId"
                })
            } else {
                if (typeof req.body.bloggerId !== "number") {
                    errors.push({
                        message: "bloggerId is not a number",
                        field: "bloggerId"
                    })
                }
            }
        } else {
            errors.push({
                message: "bloggerId is not defined",
                field: "bloggerId"
            })
        }

        if (errors.length > 0) {
            res.status(400).send({
                errorsMessages: errors
            })
        }

        const isUpdated = postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }
})

postsRouter.get(`/`, (req: Request, res: Response) => {
    const posts = postsRepository.findAllPosts()
    res.status(200).send(posts)
})

postsRouter.get(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const post = postsRepository.findPostById(+req.params.id)

        if (!post) {
            res.sendStatus(404)
        } else {
            res.send(post)
        }
    } else {
        res.sendStatus(400)
    }
})