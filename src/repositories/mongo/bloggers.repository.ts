import {bloggersCollection} from "../db"
import { BloggerType } from "../types";
import {PaginationResultType} from "./types";

export const bloggersRepository = {
    async findBloggerById(id: number): Promise<BloggerType | null> {
        return await bloggersCollection.findOne({id})
    },
    async findAllBloggers(page: number = 1, pageSize: number = 10, searchName: string): Promise<PaginationResultType<BloggerType[]>> {
        const totalCount: number = await bloggersCollection.countDocuments({name: {$regex: searchName}})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const bloggers: BloggerType[] = await bloggersCollection.find({name: {$regex: searchName}})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: bloggers,
        }
    },
    async removeBloggerById(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})

        return result.deletedCount === 1
    },
    async createBlogger(newBlogger: BloggerType): Promise<void> {
        await bloggersCollection.insertOne(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id}, {name, youtubeUrl})

        return result.matchedCount === 1
    }
}