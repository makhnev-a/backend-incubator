import express, {Request, Response} from "express";
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000
const prefix = '/lesson_01/api'

app.use(cors())
app.use(express.json())

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Heroku!!!')
})

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

app.delete(`${prefix}/videos/:id`, (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = videos.findIndex(video => video.id === id)

    if (index === -1) {
        res.sendStatus(404)
    } else {
        videos.splice(index, 1)
        res.sendStatus(204)
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
        res.sendStatus(404)
        res.send("If video for passed id doesn't exist")
    } else {
        res.send(video)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
