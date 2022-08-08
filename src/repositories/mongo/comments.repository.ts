import {commentsCollection} from "../db";
import {CommentType, PaginationResultType} from "./types";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    async createComment(comment: CommentType): Promise<CommentType | null> {
        const result = await commentsCollection.insertOne(comment)

        return result.acknowledged ? {
            ...comment,
            _id: result.insertedId
        } : null
    },
    async findAllComments(postId: number, page: number, pageSize: number): Promise<PaginationResultType<CommentType[]>> {
        const totalCount: number = await commentsCollection.count({})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const comments: CommentType[] = await commentsCollection.find({})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: comments,
        }
    },
    async findCommentById(commentId: string): Promise<CommentType | null> {
        return await commentsCollection.findOne({_id: new ObjectId(commentId)})
    },
    async removeComment(commentId: string): Promise<boolean> {
        const result = await commentsCollection.deleteOne({_id: new ObjectId(commentId)})
        return result.deletedCount === 1
    }
}
