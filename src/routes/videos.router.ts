import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos.repository";



export const videosRouter = Router({})

videosRouter.post(`/`, (req: Request, res: Response) => {
    if (req.body.title) {
        if (req.body.title.length < 40) {
            const id = +(new Date())
            videosRepository.createVideo(id, req.body.title, 'it-incubator.ru')
            const newVideo = videosRepository.findVideoById(id)
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

videosRouter.delete(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const video = videosRepository.findVideoById(+req.params.id)
        const isDeleted = videosRepository.removeVideoById(+req.params.id)

        if (video) {
            if (!isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }
})

videosRouter.put(`/:id`, (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const video = videosRepository.findVideoById(id)

    if (video) {
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

        const isUpdated = videosRepository.updateVideo(id, req.body.title)

        if (!isUpdated) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    } else {
        res.sendStatus(404)
    }

})

videosRouter.get(`/`, (req: Request, res: Response) => {
    const videos = videosRepository.findAllVideos()
    res.status(200).send(videos)
})

videosRouter.get(`/:id`, (req: Request, res: Response) => {
    if ("id" in req.params) {
        const video = videosRepository.findVideoById(+req.params.id)

        if (!video) {
            res.sendStatus(404)
        } else {
            res.status(200).send(video)
        }
    } else {
        res.sendStatus(404)
    }
})