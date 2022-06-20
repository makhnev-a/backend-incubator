const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
    findAllVideos() {
        return videos
    },
    findVideoById(id: number) {
        return videos.find(video => video.id === id)
    },
    removeVideoById(id: number) {
        for (let i: number = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    },
    updateVideo(id: number, title: string) {
        const video = videos.find(video => video.id === id)

        if (video) {
            video.title = title
            return true
        } else {
            return false
        }
    },
    createVideo(id: number, title: string, author: string) {
        const newVideo = {
            id,
            title,
            author
        }
        videos.push(newVideo)
    }
}