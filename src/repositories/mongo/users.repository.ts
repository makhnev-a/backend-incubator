import {PaginationResultType, UserMongoType, UserType} from "./types";
import {usersCollection} from "../db";
import {ObjectId} from "mongodb"

export const usersRepository = {
    async createUser(user: UserMongoType): Promise<UserType> {
        const result = await usersCollection.insertOne(user)
        const userId: ObjectId = result.insertedId

        return {
            id: userId,
            login: user.login
        }
    },
    async removeUser(userId: ObjectId): Promise<boolean> {
        const user: UserMongoType | null = await usersCollection.findOne({_id: userId})

        if (!user) {
            return false
        }

        const result = await usersCollection.deleteOne({_id: userId})
        return result.deletedCount === 1
    },
    async getAllUsers(page: number, pageSize: number): Promise<PaginationResultType<UserMongoType[]>> {
        const totalCount: number = await usersCollection.count({})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const users: UserMongoType[] = await usersCollection.find({})
            .skip(realPage)
            .limit(pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: users,
        }
    },
    async findUserById(userId: ObjectId): Promise<UserType | null> {
        const user = await usersCollection.findOne({_id: userId})

        if (!user) {
            return null
        }

        return {
            id: user._id,
            login: user.login
        }
    }
}