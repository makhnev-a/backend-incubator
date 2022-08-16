import {PaginationResultType, UserMongoType, UserType} from "./types";
import {usersCollection} from "../db";
import {ObjectId} from "mongodb"

export const usersRepository = {
    async createUser(user: UserMongoType): Promise<UserType> {
        const result = await usersCollection.insertOne(user)
        const userId: ObjectId = result.insertedId

        return {
            id: userId.toString(),
            login: user.login
        }
    },
    async removeUser(userId: string): Promise<boolean> {
        try {
            const user: UserMongoType | null = await usersCollection.findOne({_id: new ObjectId(userId)})

            if (!user) {
                return false
            }

            const result = await usersCollection.deleteOne({_id: new ObjectId(userId)})
            return result.deletedCount === 1
        } catch {
            return false
        }
    },
    async getAllUsers(page: number, pageSize: number): Promise<PaginationResultType<UserType[]>> {
        const totalCount: number = await usersCollection.count({})
        const pagesCount: number = Math.ceil(totalCount / pageSize)
        const realPage: number = (page - 1) * pageSize
        const users: UserMongoType[] = await usersCollection.find({})
            .skip(realPage)
            .limit(pageSize)
            .toArray()
        const mappedUsers: UserType[] = users.map(user => ({
            id: new ObjectId(user._id).toString(),
            login: user.login
        }))

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: mappedUsers,
        }
    },
    async findUserById(userId: ObjectId | undefined): Promise<UserMongoType | null> {
        try {
            const user = await usersCollection.findOne({_id: userId})
            return !user ? null : user
        } catch {
            return null
        }
    },
    async findUserByLogin(login: string): Promise<UserMongoType | null> {
        try {
            const user: UserMongoType | null = await usersCollection.findOne({login})
            return !user ? null : user
        } catch {
            return null
        }
    }
}