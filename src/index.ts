import express, {Request, Response} from "express";
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
// app.use(bodyParser.json({ type: 'application/*+json' }))
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

app.post("/videos", (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.ru'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

app.delete("/videos/:id", (req: Request, res: Response) => {
    const newVideos = videos.filter(video => video.id !== Number(req.params.id))
    res.send(newVideos)
})

app.put("/videos/:id", (req: Request, res: Response) => {
    const updatedVideos = videos.map(video => {
        if (video.id === Number(req.params.id)) {
            return {
                ...video,
                title: req.body.title,
				author: "Andrey Makhnev"
            }
        }

        return video
    })
    res.send(updatedVideos)
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get("/videos/:id", (req: Request, res: Response) => {
    const video = videos.find(video => video.id === Number(req.params.id))

    if (!video) {
        res.sendStatus(404)
    } else {
        res.send(video)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
