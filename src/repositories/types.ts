export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}

export type PostType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}