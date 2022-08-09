import {postsRepository} from "../repositories/mongo/posts.repository";
import {PaginationResultType} from "../repositories/mongo/types";
import {PostType} from "../repositories/types";
import {ObjectId} from "mongodb";

export const postsService = {
    async findAllPosts(page: number, pageSize: number): Promise<PaginationResultType<PostType[]>> {
        return await postsRepository.findAllPosts(page, pageSize)
    },
    async findPostById(id: number): Promise<PostType | null> {
        return await postsRepository.findPostById(id)
    },
    async removePostById(id: number): Promise<boolean> {
        return await postsRepository.removePostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: string, bloggerName: string, id: number): Promise<void> {
        const newPost: PostType = {
            id,
            title,
            shortDescription,
            content,
            bloggerId: new ObjectId(bloggerId),
            bloggerName,
        }

        return await postsRepository.createPost(newPost)
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    }
}