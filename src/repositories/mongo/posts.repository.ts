import {postsCollection} from "../db"
import { PostType } from "../types";
import {PaginationResultType} from "./types";

export const postsRepository = {
    async findAllPosts(page: number, pageSize: number): Promise<PaginationResultType<PostType[]>> {
        const totalCount: number = await postsCollection.count({})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const posts = await postsCollection.find({}, {projection: {_id: 0}})
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
    },
    async findPostById(id: number): Promise<PostType | null> {
        const post: PostType | null = await postsCollection.findOne({id})

        return post ? post : null
    },
    async removePostById(id: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id})

        return result.deletedCount === 1
    },
    async createPost(newPost: PostType): Promise<void> {
        await postsCollection.insertOne(newPost)
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({id}, {$set: {title, shortDescription, content, bloggerId}})

        return result.matchedCount === 1
    }
}