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
    if (req.body.title) {
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
        res.sendStatus(201)
        res.send(newPost)
    } else {
        res.sendStatus(400)
        res.send({
            "errorsMessages": [
                {
                    "message": "The Title field is required.",
                    "field": "title"
                }
            ]
        })
    }
})

app.delete(`/posts/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const id = Number(req.params.id)
        const index = posts.findIndex(post => post.id === id)

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

    if (!post) {
        res.sendStatus(400)
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
        if (typeof req.params.id !== "string") {
            res.sendStatus(400)
        } else {
            const id = Number(req.params.id)
            const post = posts.find(post => post.id === id)

            if (!post) {
                res.sendStatus(404)
            } else {
                res.send(post)
            }
        }
    } else {
        res.sendStatus(400)
    }

})

// Bloggers
app.post(`/bloggers`, (req: Request, res: Response) => {
    if (req.body.name && req.body.youtubeUrl) {
        const idd = Math.random() * 100
        const newBlogger = {
            id: idd,
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl,
        }
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    } else {
        res.sendStatus(400)
        res.send({
            "errorsMessages": [
                {
                    "message": "The Name & YoutubeUrl field is required.",
                    "field": "Name, YoutubeUrl"
                }
            ]
        })
    }
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
        res.sendStatus(400)
    } else {
        if ("name" in req.body && "youtubeUrl" in req.body) {
            blogger.name = req.body.name
            blogger.youtubeUrl = req.body.youtubeUrl
            res.status(201).send(blogger)
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
