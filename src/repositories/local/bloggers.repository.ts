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
    async findBloggerById(id: number): Promise<any> {
        return bloggers.find(blogger => blogger.id === id)
    },
    async findAllBloggers(): Promise<any> {
        return bloggers
    },
    async removeBloggerById(id: number): Promise<boolean> {
        for (let i: number = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true
            }
        }
        return false
    },
    async createBlogger(id: number, name: string, youtubeUrl: string): Promise<void> {
        const newBlogger = {
            id,
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const blogger: any | undefined = await bloggersRepository.findBloggerById(id)

        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    }
}