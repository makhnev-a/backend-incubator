import {bloggersRepository} from "../repositories/mongo/bloggers.repository";
import {PaginationResultType} from "../repositories/mongo/types";
import {BloggerType, PostType} from "../repositories/types";

export const bloggersService = {
    async findBloggerById(id: string): Promise<BloggerType | null> {
        return await bloggersRepository.findBloggerById(id)
    },
    async findAllBloggers(page: number, pageSize: number, searchName: string): Promise<PaginationResultType<BloggerType[]>> {
        return await bloggersRepository.findAllBloggers(page, pageSize, searchName)
    },
    async removeBloggerById(id: string): Promise<boolean> {
        return await bloggersRepository.removeBloggerById(id)
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType> {
        const newBlogger = {
            name,
            youtubeUrl
        }

        console.log(newBlogger);
        debugger

        return await bloggersRepository.createBlogger(newBlogger)
    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },
    async findPostsFromBloggers(page: number, pageSize: number, bloggerId: string): Promise<PaginationResultType<PostType[]>> {
        return await bloggersRepository.findPostsFromBloggers(page, pageSize, bloggerId)
    }
}