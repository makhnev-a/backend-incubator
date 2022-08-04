import {PostType} from "../local/posts.repository"
import {client} from "../db"

export const postsRepository = {
    async findAllPosts(): Promise<PostType[]> {
        return await client.db("samuraiback")
            .collection<PostType>("posts")
            .find({})
            .toArray()
    },
    async findPostById(id: number): Promise<PostType | null> {
        const post: PostType | null = await client.db("samuraiback")
            .collection<PostType>("posts")
            .findOne({id})

        return post ? post : null
    },
    async removePostById(id: number): Promise<boolean> {
        const result = await client.db("samuraiback")
            .collection<PostType>("posts")
            .deleteOne({id})

        return result.deletedCount === 1
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: number, bloggerName: string, id: number): Promise<void> {
        const newPost = {
            id,
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName,
        }

        await client.db("samuraiback")
            .collection<PostType>("posts")
            .insertOne(newPost)
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const result = await client.db("samuraiback")
            .collection<PostType>("posts")
            .updateOne({id}, {$set: {title, shortDescription, content, bloggerId}})

        return result.matchedCount === 1
    }
}