import {CommentType} from "../repositories/mongo/types";
import {commentsRepository} from "../repositories/mongo/comments.repository";

export const commentsService = {
    async createComment(comment: CommentType): Promise<CommentType | null> {
        return commentsRepository.createComment(comment)
    }
}