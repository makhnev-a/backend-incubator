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
    createdAt: Date
    login: string
    password: string
    passwordSalt: string
    passwordHash: string
}