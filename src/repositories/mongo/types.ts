import {ObjectId} from "mongodb";

export type PaginationResultType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T,
}

export type UserType = {
    id: ObjectId
    login: string
}

export type UserMongoType = {
    _id?: ObjectId
    createdAt: Date
    login: string
    password: string
    passwordSalt: string
    passwordHash: string
}

export type CommentType = {
    _id?: ObjectId
    content: string
    userId: ObjectId | undefined
    userLogin: string | undefined
    addedAt: Date
}