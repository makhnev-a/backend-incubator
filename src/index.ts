import express, {Request, Response} from "express";
import cors from "cors"
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000
const prefix = '/lesson_01/api'
const postsPrefix = '/hs_01/api'

app.use(cors())
// app.use(express.json())
app.use(bodyParser.json())

interface IBloggersError {
    message: string
    field: string
}

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

const posts = [
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

const bloggers = [
    {
        id: 1,
        name: "Petr",
        youtubeUrl: "youtube.com/petrtv"
    },
    {
        id: 2,
        name: "Ivan",
        youtubeUrl: "youtube.com/ivantv"
    },
    {
        id: 3,
        name: "Max",
        youtubeUrl: "youtube.com/maxtv"
    },
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Heroku!!!')
})

// videos
app.post(`/videos`, (req: Request, res: Response) => {
    if (req.body.title) {
        if (req.body.title.length < 40) {
            const newVideo = {
                id: +(new Date()),
                title: req.body.title,
                author: 'it-incubator.ru'
            }
            videos.push(newVideo)
            res.status(201).send(newVideo)
        } else {
            res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "The Title field length max 40 chars.",
                        "field": "title"
                    }
                ]
            })
        }
    } else {
        res.status(400).json({
            "errorsMessages": [
                {
                    "message": "The Title field is required.",
                    "field": "title"
                }
            ]
        })
    }
})

app.delete(`/videos/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const id: number = Number(req.params.id)
        const index: number = videos.findIndex(video => video.id === id)

        if (index === -1) {
            res.sendStatus(404)
        } else {
            videos.splice(index, 1)
            res.sendStatus(204)
        }
    } else {
        res.sendStatus(404)
    }
})

app.put(`/videos/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        if (typeof req.body.title !== 'string') {
            res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "The Title field has been string",
                        "field": "title"
                    }
                ]
            })
            return
        }

        if (req.body.title.length > 40) {
            res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "The Title field length > 40.",
                        "field": "title"
                    }
                ]
            })
            return
        }

        const id: number = Number(req.params.id)
        const video = videos.find(video => video.id === id)

        if (!video) {
            res.sendStatus(404)
        } else {
            video.title = req.body.title
            res.status(204).send(video)
        }
    } else {
        res.sendStatus(404)
    }

})

app.get(`/videos`, (req: Request, res: Response) => {
    res.status(200)
    res.send(videos)
})

app.get(`/videos/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const video = videos.find(video => video.id === Number(req.params.id))

        if (!video) {
            res.sendStatus(404)
        } else {
            res.status(200).send(video)
        }
    } else {
        res.sendStatus(404)
    }
})

// Posts
app.post(`/posts`, (req: Request, res: Response) => {
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
        if (typeof req.body.bloggerId !== "number") {
            errors.push({
                message: "bloggerId is not a number",
                field: "bloggerId"
            })
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

app.delete(`/posts/:id`, (req: Request, res: Response) => {
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

app.put(`/posts/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)
    let errors = []

    if (req.body.title.length > 30) {
        errors.push({
            message: "title length > 30 chars",
            field: "title"
        })
    }

    if (req.body.shortDescription.lenght > 100) {
        errors.push({
            message: "shortDescription length > 100 chars",
            field: "shortDescription"
        })
    }

    if (req.body.content.length > 1000) {
        errors.push({
            message: "content length > 1000 chars",
            field: "content"
        })
    }

    if (typeof req.body.bloggerId !== "number") {
        errors.push({
            message: "bloggerId is not a number",
            field: "bloggerId"
        })
    }

    if (errors.length > 0) {
        res.status(400).send({
            errorsMessages: errors
        })
    }

    if (!post) {
        res.sendStatus(404)
    } else {
        post.title = req.body.title
        post.content = req.body.content
        post.bloggerId = req.body.bloggerId
        post.shortDescription = req.body.shortDescription
        res.sendStatus(204)
    }
})

app.get(`/posts`, (req: Request, res: Response) => {
    res.status(200).send(posts)
})

app.get(`/posts/:id`, (req: Request, res: Response) => {
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

// Bloggers
app.post(`/bloggers`, (req: Request, res: Response) => {
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

    const idd = Math.random() * 100
    const newBlogger = {
        id: idd,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl,
    }
    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)
})

app.delete(`/bloggers/:id`, (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const index: number = bloggers.findIndex(post => post.id === id)

    if (index === -1) {
        res.sendStatus(404)
    } else {
        bloggers.splice(index, 1)
        res.sendStatus(204)
    }
})

app.put(`/bloggers/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const blogger = bloggers.find(blogger => blogger.id === id)

    if (!blogger) {
        res.sendStatus(404)
    } else {
        if ("name" in req.body && "youtubeUrl" in req.body) {
            blogger.name = req.body.name
            blogger.youtubeUrl = req.body.youtubeUrl
            res.sendStatus(204)
        } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "bloggers name and youtubeUrl has been required",
                        field: "name"
                    }
                ]
            })
        }
    }
})

app.get(`/bloggers`, (req: Request, res: Response) => {
    res.status(200)
    res.send(bloggers)
})

app.get(`/bloggers/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const blogger = bloggers.find(blogger => blogger.id === id)

    if (!blogger) {
        res.status(404)
        res.send("Not bound")
    } else {
        res.send(blogger)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
