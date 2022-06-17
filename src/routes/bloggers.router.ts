import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers.repository";
import {postsRepository} from "../repositories/posts.repository";

export const bloggersRouter = Router({})

bloggersRouter.post(`/`, (req: Request, res: Response) => {
    let errors = []
    const regexpURL = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

    if ("name" in req.body) {
        const nameTrim = req.body.name.trim()

        if (nameTrim.length === 0) {
            errors.push({
                "message": "name not required",
                "field": "name"
            })
        }
        if (nameTrim.length > 15) {
            errors.push({
                "message": "name length > 15",
                "field": "name"
            })
        }
    } else {
        errors.push({
            "message": "field name not found",
            "field": "name"
        })
    }


    if ("youtubeUrl" in req.body) {
        const urlTrim = req.body.youtubeUrl.trim()

        if (urlTrim.length === 0) {
            errors.push({
                "message": "youtubeUrl not reqiured",
                "field": "youtubeUrl"
            })
        } else {
            if (!regexpURL.test(urlTrim)) {
                errors.push({
                    "message": "youtubeUrl bad url",
                    "field": "youtubeUrl"
                })
            }
            if (urlTrim.length > 100) {
                errors.push({
                    "message": "youtubeUrl length > 100 chars",
                    "field": "youtubeUrl"
                })
            }
        }
    } else {
        errors.push({
            "message": "field youtubeUrl not found",
            "field": "youtubeUrl"
        })
    }


    if (errors.length > 0) {
        res.status(400).send({
            errorsMessages: errors
        })
        return
    }

    const id = Math.random() * 100
    bloggersRepository.createBlogger(id, req.body.name, req.body.youtubeUrl)
    const newBlogger = bloggersRepository.findBloggerById(id)
    res.status(201).send(newBlogger)
})

bloggersRouter.delete(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const blogger = bloggersRepository.findBloggerById(+req.params.id)
        const isDeleted = bloggersRepository.removeBloggerById(+req.params.id)

        if (!blogger) {
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

bloggersRouter.put(`/:id`, (req: Request, res: Response) => {
    const blogger = postsRepository.findPostById(+req.params.id)
    const regexpURL = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
    let errors = []

    if (!blogger) {
        res.sendStatus(404)
    } else {
        if ("name" in req.body) {
            const newName = req.body.name.trim()
            if (newName.length === 0) {
                errors.push({
                    message: "name has been required",
                    field: "name"
                })
            } else {
                if (newName.length > 15) {
                    errors.push({
                        message: "name field length > 15 chars",
                        field: "name"
                    })
                }
            }

        } else {
            errors.push({
                message: "name field is not defined",
                field: "name"
            })
        }

        if ("youtubeUrl" in req.body) {
            const newYoutubeUrl = req.body.youtubeUrl.trim()
            if (newYoutubeUrl.lenght === 0) {
                errors.push({
                    message: "youtubeUrl has been required",
                    field: "youtubeUrl"
                })
            } else {
                if (regexpURL.test(newYoutubeUrl)) {
                    if (newYoutubeUrl.length > 100) {
                        errors.push({
                            message: "youtubeUrl length > 100 chars",
                            field: "youtubeUrl"
                        })
                    }
                } else {
                    errors.push({
                        message: "youtubeUrl regex error",
                        field: "youtubeUrl"
                    })
                }
            }
        } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "youtubeUrl is not defined",
                        field: "youtubeUrl"
                    }
                ]
            })
        }

        if (errors.length > 0) {
            res.status(400).send({
                errorsMessages: errors
            })
        }

        const isUpdated = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)

        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }
})

bloggersRouter.get(`/`, (req: Request, res: Response) => {
    const bloggers = bloggersRepository.findAllBloggers()
    res.status(200).send(bloggers)
})

bloggersRouter.get(`/:id`, (req: Request, res: Response) => {
    const blogger = bloggersRepository.findBloggerById(+req.params.id)

    if (!blogger) {
        res.status(404)
        res.send("Not bound")
    } else {
        res.send(blogger)
    }
})