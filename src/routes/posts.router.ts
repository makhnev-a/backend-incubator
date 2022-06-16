import {Request, Response, Router} from "express";
import {bloggers} from "./bloggers.router";

export const posts = [
    {
        id: 1,
        title: "Hello world!",
        shortDescription: "Description 1",
        content: "lorem lorem lorem lorem 1",
        bloggerId: 1,
        bloggerName: "Petr"
    },
    {
        id: 2,
        title: "Title by Author!",
        shortDescription: "Description 2",
        content: "lorem lorem lorem lorem 2",
        bloggerId: 2,
        bloggerName: "Ivan"
    },
    {
        id: 3,
        title: "Black book",
        shortDescription: "Description 3",
        content: "lorem lorem lorem lorem 3",
        bloggerId: 3,
        bloggerName: "Max"
    },
]

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
        const post = bloggers.find(blogger => blogger.id === req.body.bloggerId)

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
        const idd = Number(new Date())
        const newPost = {
            id: idd,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: req.body.bloggerId,
            bloggerName: "Andrey Makhnev",
        }
        posts.push(newPost)
        res.status(201).send(newPost)
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
        const id = Number(req.params.id)
        const index = posts.findIndex(post => post.id === id)
        const post = posts.find(post => post.id === id)

        if (!post) {
            res.sendStatus(404)
        }

        if (index === -1) {
            res.sendStatus(404)
        } else {
            posts.splice(index, 1)
            res.sendStatus(204)
        }
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put(`/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)
    let errors = []

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
            const blogger = bloggers.find(blogger => blogger.id === req.body.bloggerId)

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

        post.title = req.body.title
        post.content = req.body.content
        post.bloggerId = req.body.bloggerId
        post.shortDescription = req.body.shortDescription
        res.sendStatus(204)
    }
})

postsRouter.get(`/`, (req: Request, res: Response) => {
    res.status(200).send(posts)
})

postsRouter.get(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const id = Number(req.params.id)
        const post = posts.find(post => post.id === id)

        if (!post) {
            res.sendStatus(404)
        } else {
            res.send(post)
        }
    } else {
        res.sendStatus(400)
    }

})