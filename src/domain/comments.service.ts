import {CommentType, PaginationResultType} from "../repositories/mongo/types";
import {commentsRepository} from "../repositories/mongo/comments.repository";
import {ObjectId} from "mongodb";

export const commentsService = {
    async createComment(comment: CommentType): Promise<CommentType | null> {
        return commentsRepository.createComment(comment)
    },
    async findAllComments(postId: number, page: number, pageSize: number): Promise<PaginationResultType<CommentType[]>> {
        return commentsRepository.findAllComments(postId, page, pageSize)
    },
    async findCommentById(commentId: string): Promise<CommentType | null> {
        return commentsRepository.findCommentById(commentId)
    },
    async removeComment(commentId: string): Promise<boolean> {
        return commentsRepository.removeComment(commentId)
    }
}