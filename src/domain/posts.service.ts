import {postsRepository} from "../repositories/mongo/posts.repository";
import {PaginationResultType} from "../repositories/mongo/types";
import {PostType} from "../repositories/types";
import {ObjectId} from "mongodb";

export const postsService = {
    async findAllPosts(page: number, pageSize: number): Promise<PaginationResultType<PostType[]>> {
        return await postsRepository.findAllPosts(page, pageSize)
    },
    async findPostById(id: string): Promise<PostType | null> {
        return await postsRepository.findPostById(id)
    },
    async removePostById(id: string): Promise<boolean> {
        return await postsRepository.removePostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: string, bloggerName: string): Promise<PostType | null> {
        const newPost: PostType = {
            title,
            shortDescription,
            content,
            bloggerId: new ObjectId(bloggerId),
            bloggerName,
        }

        return await postsRepository.createPost(newPost)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    }
}