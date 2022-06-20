export const bloggers = [
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

export const bloggersRepository = {
    findBloggerById(id: number) {
        return bloggers.find(blogger => blogger.id === id)
    },
    findAllBloggers() {
        return bloggers
    },
    removeBloggerById(id: number) {
        for (let i: number = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true
            }
        }
        return false
    },
    createBlogger(id: number, name: string, youtubeUrl: string) {
        const newBlogger = {
            id,
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
    },
    updateBlogger(id: number, name: string, youtubeUrl: string) {
        const blogger = bloggersRepository.findBloggerById(id)

        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    }
}