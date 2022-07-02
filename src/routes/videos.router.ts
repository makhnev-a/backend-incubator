import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos.repository";
import {titleVidelMiddleware, videoIdMiddleware} from "../middlewares/videos.middleware";

export const videosRouter = Router({})

videosRouter.post(
    `/`,
    titleVidelMiddleware,
    (req: Request, res: Response) => {
        const videlId = +(new Date())
        videosRepository.createVideo(videlId, req.body.title, 'it-incubator.ru')

        const newVideo = videosRepository.findVideoById(videlId)
        res.status(201).send(newVideo)
    }
)

videosRouter.delete(
    `/:id`,
    videoIdMiddleware,
    (req: Request, res: Response) => {
        const video = videosRepository.findVideoById(+req.params.id)
        const isDeleted = videosRepository.removeVideoById(+req.params.id)

        if (!video) {
            res.sendStatus(404)
            return
        }

        if (!isDeleted) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }
)

videosRouter.put(
    `/:id`,
    titleVidelMiddleware,
    (req: Request, res: Response) => {
        const videoId = +req.params.id
        const video = videosRepository.findVideoById(videoId)

        if (!video) {
            res.sendStatus(404)
            return
        }

        const isUpdated = videosRepository.updateVideo(videoId, req.body.title)

        if (!isUpdated) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }
)

videosRouter.get(`/`, (req: Request, res: Response) => {
    const videos = videosRepository.findAllVideos()
    res.status(200).send(videos)
})

videosRouter.get(
    `/:id`,
    videoIdMiddleware,
    (req: Request, res: Response) => {
        const video = videosRepository.findVideoById(+req.params.id)

        if (!video) {
            res.sendStatus(404)
        } else {
            res.status(200).send(video)
        }
    }
)