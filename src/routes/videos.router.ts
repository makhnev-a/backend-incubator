import {Request, Response, Router} from "express";

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRouter = Router({})

videosRouter.post(`/`, (req: Request, res: Response) => {
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

videosRouter.delete(`/:id`, (req: Request, res: Response) => {
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

videosRouter.put(`/:id`, (req: Request, res: Response) => {
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

videosRouter.get(`/`, (req: Request, res: Response) => {
    res.status(200)
    res.send(videos)
})

videosRouter.get(`/:id`, (req: Request, res: Response) => {
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