import bcrypt from "bcrypt"
import {usersRepository} from "../repositories/mongo/users.repository";
import {ObjectId} from "mongodb";
import {PaginationResultType, UserMongoType, UserType} from "../repositories/mongo/types";

export const usersService = {
    async createUser(login: string, password: string): Promise<UserType> {
        const passwordSalt: string = await bcrypt.genSalt(10)
        const passwordHash: string = await this._generateHash(password, passwordSalt)
        const newUser: UserMongoType = {
            login,
            password,
            passwordSalt,
            passwordHash,
            createdAt: new Date()
        }

        return await usersRepository.createUser(newUser)
    },
    async checkCredentials(login: string, password: string) {
        // const user = await rep.user
        // if (!user) {
        //     return false
        // }
        // const passwordHash = await this._generateHash(password, user.passwordSalt)
        //
        // if (user.passwordHash !== passwordHash) {
        //     return false
        // }
        // return true
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        console.log("hash: ", hash)
        return hash
    },
    async removeUser(userId: ObjectId): Promise<boolean> {
        return await usersRepository.removeUser(userId)
    },
    async getAllUsers(page: number, pageSize: number): Promise<PaginationResultType<UserMongoType[]>> {
        return await usersRepository.getAllUsers(page, pageSize)
    },
    async getUserById(userId: ObjectId): Promise<UserType | null> {
        return await usersRepository.findUserById(userId)
    }
}