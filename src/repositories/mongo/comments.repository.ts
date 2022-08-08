import {commentsCollection} from "../db";
import {CommentType} from "./types";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    // async createComment(comment: CommentType): Promise<CommentType | null> {
    // async createComment(content: string, userId: ObjectId | undefined, userLogin: string | undefined, addedAt: Date): Promise<CommentType | null> {
    async createComment(comment: CommentType): Promise<CommentType | null> {
        const result = await commentsCollection.insertOne(comment)
        // return result.acknowledged ? {
        //     content,
        //     userId,
        //     userLogin,
        //     addedAt,
        //     _id: result.insertedId
        // } : null

        return result.acknowledged ? {
            ...comment,
            _id: result.insertedId
        } : null
    }
}