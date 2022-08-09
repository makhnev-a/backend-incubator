import {postsCollection} from "../db"
import {PostType} from "../types";
import {PaginationResultType} from "./types";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async findAllPosts(page: number, pageSize: number): Promise<PaginationResultType<PostType[]>> {
        const totalCount: number = await postsCollection.count({})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const posts = await postsCollection.find({})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        const mappedPosts = posts.map(post => ({
            id: new ObjectId(post._id).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.bloggerId,
            bloggerName: post.bloggerName,
        }))

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: mappedPosts,
        }
    },
    async findPostById(id: string): Promise<PostType | null> {
        const post: PostType | null = await postsCollection.findOne({_id: new ObjectId(id)})

        return post
            ? {
                id: new ObjectId(post._id).toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName
            }
            : null
    },
    async removePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return result.deletedCount === 1
    },
    async createPost(newPost: PostType): Promise<PostType | null> {
        const result = await postsCollection.insertOne(newPost)

        return {
            id: new ObjectId(result.insertedId).toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            bloggerId: newPost.bloggerId,
            bloggerName: newPost.bloggerName
        }
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title,
                shortDescription,
                content,
                bloggerId: new ObjectId(bloggerId)
            }
        })

        return result.matchedCount === 1
    }
}