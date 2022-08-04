import {BloggerType} from "../repositories/local/bloggers.repository"
import {bloggersRepository, BloggersResponseType} from "../repositories/mongo/bloggers.repository";

export const bloggersService = {
    async findBloggerById(id: number): Promise<BloggerType | null> {
        return await bloggersRepository.findBloggerById(id)
    },
    async findAllBloggers(page: number, pageSize: number): Promise<BloggersResponseType> {
        return await bloggersRepository.findAllBloggers(page, pageSize)
    },
    async removeBloggerById(id: number): Promise<boolean> {
        return await bloggersRepository.removeBloggerById(id)
    },
    async createBlogger(id: number, name: string, youtubeUrl: string): Promise<void> {
        const newBlogger = {
            id,
            name,
            youtubeUrl
        }

        return await bloggersRepository.createBlogger(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    }
}