import {commentsCollection} from "../db";
import {CommentType, PaginationResultType} from "./types";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    async createComment(comment: CommentType): Promise<CommentType | null> {
        const result = await commentsCollection.insertOne(comment)

        return result.acknowledged ? {
            id: new ObjectId(result.insertedId).toString(),
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            addedAt: comment.addedAt
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
        const mappedComments: CommentType[] = comments.map(comment => ({
            id: new ObjectId(comment._id).toString(),
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            addedAt: comment.addedAt
        }))

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: mappedComments,
        }
    },
    async findCommentById(commentId: string): Promise<CommentType | null> {
        try {
            const comment: CommentType | null = await commentsCollection.findOne({_id: new ObjectId(commentId)})

            return !comment ? null : {
                id: commentId,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                addedAt: comment.addedAt
            }
        } catch {
            return null
        }
    },
    async removeComment(commentId: string): Promise<boolean> {
        try {
            const result = await commentsCollection.deleteOne({_id: new ObjectId(commentId)})
            return result.deletedCount === 1
        } catch {
            return false
        }
    },
    async updateComment(commentId: string, content: string): Promise<boolean> {
        const result = await commentsCollection.updateOne({_id: new ObjectId(commentId)}, {$set: {content}})
        return result.matchedCount === 1
    }
}
