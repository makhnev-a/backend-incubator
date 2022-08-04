import {BloggerType} from "../local/bloggers.repository"
import {bloggersCollection} from "../db"

export const bloggersRepository = {
    async findBloggerById(id: number): Promise<BloggerType | null> {
        return await bloggersCollection.findOne({id})
    },
    async findAllBloggers(): Promise<BloggerType[]> {
        return await bloggersCollection.find({}).toArray()
    },
    async removeBloggerById(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})

        return result.deletedCount === 1
    },
    async createBlogger(id: number, name: string, youtubeUrl: string): Promise<void> {
        const newBlogger = {
            id,
            name,
            youtubeUrl
        }

        await bloggersCollection.insertOne(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id}, {name, youtubeUrl})

        return result.matchedCount === 1
    }
}