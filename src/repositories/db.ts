import {MongoClient} from "mongodb"
import {config} from "../config";

const mongoURL = config.dbURL

export const client = new MongoClient(mongoURL)

export async function runDB() {
    try {
        await client.connect()
        await client.db("samuraiback").command({ping: 1})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}