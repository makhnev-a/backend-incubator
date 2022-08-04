import {MongoClient} from "mongodb"
import {config} from "../config";
import {PostType} from "./local/posts.repository";
import {BloggerType} from "./local/bloggers.repository";

const mongoURL = config.dbURL

const client = new MongoClient(mongoURL)
const db = client.db("samuraiback")

export const postsCollection = db.collection<PostType>("posts")
export const bloggersCollection = db.collection<BloggerType>("bloggers")

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