import {bloggersCollection, postsCollection} from "../db"
import {BloggerType, PostType} from "../types";
import {PaginationResultType} from "./types";
import {ObjectId} from "mongodb";

export const bloggersRepository = {
    async findBloggerById(id: string): Promise<BloggerType | null> {
        try {
            const blogger: BloggerType | null = await bloggersCollection.findOne({_id: new ObjectId(id)}, {projection: {_id: 0}})
            return !blogger ? null : {...blogger, id}
        } catch {
            return null
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
        const posts: PostType[] = await postsCollection.find({bloggerId: new ObjectId(bloggerId)})
            .skip(realPage)
            .limit(pageSize)
            .toArray()
        const mappedPosts: PostType[] = posts.map(post => ({
            id: new ObjectId(post._id).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.bloggerId,
            bloggerName: post.bloggerName
        }))

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: mappedPosts,
        }
    }
}