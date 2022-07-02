import express, {Request, Response} from "express";
import cors from "cors"
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos.router";
import {postsRouter} from "./routes/posts.router";
import {bloggersRouter} from "./routes/bloggers.router";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
// app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Heroku!!!')
})

app.use('/videos', videosRouter)
app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
