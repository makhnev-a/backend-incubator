import cors from "cors"
import bodyParser from "body-parser";
import {runDB} from "./repositories/db";
import {authRouter} from "./routes/auth.router";
import {postsRouter} from "./routes/posts.router";
import express, {Request, Response} from "express";
import {videosRouter} from "./routes/videos.router";
import {bloggersRouter} from "./routes/bloggers.router";
import {usersRouter} from "./routes/users.router";
import {commentsRouter} from "./routes/comments.router";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Heroku!!!')
})

app.use('/videos', videosRouter)
// app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()