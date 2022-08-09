import {ObjectId} from "mongodb";

export type BloggerType = {
    _id?: ObjectId
    id?: string
    name: string
    youtubeUrl: string
}

export type PostType = {
    _id?: ObjectId
    id?: string
    title: string
    shortDescription: string
    content: string
    bloggerId: ObjectId
    bloggerName: string
}