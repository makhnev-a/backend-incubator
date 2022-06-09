import express, {Request, Response} from "express";
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000
const prefix = '/lesson_01/api'
const postsPrefix = '/hs_01/api'

app.use(cors())
app.use(express.json())

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
app.post(`${prefix}/videos`, (req: Request, res: Response) => {
    if (req.body.title) {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.ru'
        }
        videos.push(newVideo)
        res.sendStatus(201)
        res.send(newVideo)
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

app.delete(`${prefix}/videos/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = videos.findIndex(video => video.id === id)

    if (index === -1) {
        res.status(404)
    } else {
        videos.splice(index, 1)
        res.status(204)
    }
})

app.put(`${prefix}/videos/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const video = videos.find(video => video.id === id)

    if (!video) {
        res.sendStatus(400)
    } else {
        video.title = req.body.title
        res.sendStatus(204)
    }
})

app.get(`${prefix}/videos`, (req: Request, res: Response) => {
    res.status(200)
    res.send(videos)
})

app.get(`${prefix}/videos/:id`, (req: Request, res: Response) => {
    const video = videos.find(video => video.id === Number(req.params.id))

    if (!video) {
        res.status(404)
        // res.send("If video for passed id doesn't exist")
    } else {
        res.status(200).send(video)
    }
})

// Posts

app.post(`${postsPrefix}/posts`, (req: Request, res: Response) => {
    if (req.body.title) {
        const idd = Math.random() * 2
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

app.delete(`${postsPrefix}/posts/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = videos.findIndex(post => post.id === id)

    if (index === -1) {
        res.sendStatus(404)
    } else {
        posts.splice(index, 1)
        res.sendStatus(204)
    }
})

app.put(`${postsPrefix}/posts/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)
    console.log(id, post);

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

app.get(`${postsPrefix}/posts`, (req: Request, res: Response) => {
    res.status(200)
    res.send(posts)
})

app.get(`${postsPrefix}/posts/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)

    if (!post) {
        res.sendStatus(404)
        res.send()
    } else {
        res.send(post)
    }
})

// Bloggers

app.post(`${postsPrefix}/bloggers`, (req: Request, res: Response) => {
    if (req.body.name && req.body.youtubeUrl) {
        const idd = Math.random() * 2
        const newBlogger = {
            id: idd,
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl,
        }
        bloggers.push(newBlogger)
        res.sendStatus(201)
        res.send(newBlogger)
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

app.delete(`${postsPrefix}/bloggers/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = bloggers.findIndex(blogger => blogger.id === id)

    if (index === -1) {
        res.sendStatus(404)
    } else {
        bloggers.splice(index, 1)
        res.sendStatus(204)
    }
})

app.put(`${postsPrefix}/bloggers/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const blogger = bloggers.find(blogger => blogger.id === id)

    if (!blogger) {
        res.sendStatus(400)
    } else {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.status(204)
    }
})

app.get(`${postsPrefix}/bloggers`, (req: Request, res: Response) => {
    res.status(200)
    res.send(bloggers)
})

app.get(`${postsPrefix}/bloggers/:id`, (req: Request, res: Response) => {
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
