import {bloggersCollection, postsCollection} from "../db"
import {BloggerType, PostType} from "../types";
import {PaginationResultType} from "./types";
import {ObjectId} from "mongodb";

export const bloggersRepository = {
    async findBloggerById(id: string): Promise<BloggerType | null> {
        const blogger: BloggerType | null = await bloggersCollection.findOne({_id: new ObjectId(id)}, {projection: {_id: 0}})

        if (!blogger) {
            return null
        }

        return {
            ...blogger,
            id,
        }
    },
    async findAllBloggers(page: number = 1, pageSize: number = 10, searchName: string): Promise<PaginationResultType<BloggerType[]>> {
        const totalCount: number = await bloggersCollection.countDocuments({name: {$regex: searchName}})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const bloggers: BloggerType[] = await bloggersCollection.find({name: {$regex: searchName}})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        const mappedBloggers: BloggerType[] = bloggers.map(blogger => ({
            id: new ObjectId(blogger._id).toString(),
            name: blogger.name,
            youtubeUrl: blogger.youtubeUrl
        }))

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: mappedBloggers,
        }
    },
    async removeBloggerById(id: string): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async createBlogger(newBlogger: BloggerType): Promise<BloggerType> {
        const result = await bloggersCollection.insertOne(newBlogger)

        return {
            id: new ObjectId(result.insertedId).toString(),
            name: newBlogger.name,
            youtubeUrl: newBlogger.youtubeUrl,
        }

    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({_id: new ObjectId(id)}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    },
    async findPostsFromBloggers(page: number, pageSize: number, bloggerId: string): Promise<PaginationResultType<PostType[]>> {
        const totalCount: number = await postsCollection.countDocuments({bloggerId: new ObjectId(bloggerId)})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const posts: PostType[] = await postsCollection.find({bloggerId: new ObjectId(bloggerId)}, {projection: {_id: 0}})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: posts,
        }
    }
}