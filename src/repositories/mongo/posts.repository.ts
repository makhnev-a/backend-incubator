import {PostType} from "../local/posts.repository"
import {postsCollection} from "../db"

export const postsRepository = {
    async findAllPosts(): Promise<PostType[]> {
        return await postsCollection.find({}).toArray()
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