export const posts = [
    {
        id: 1,
        title: "Hello world!",
        shortDescription: "Description 1",
        content: "lorem lorem lorem lorem 1",
        bloggerId: 1,
        bloggerName: "Petr"
    },
    {
        id: 2,
        title: "Title by Author!",
        shortDescription: "Description 2",
        content: "lorem lorem lorem lorem 2",
        bloggerId: 2,
        bloggerName: "Ivan"
    },
    {
        id: 3,
        title: "Black book",
        shortDescription: "Description 3",
        content: "lorem lorem lorem lorem 3",
        bloggerId: 3,
        bloggerName: "Max"
    },
]

export const postsRepository = {
    findAllPosts() {
        return posts
    },
    findPostById(id: number) {
        return posts.find(post => post.id === id)
    },
    removePostById(id: number) {
        for (let i: number = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: number, bloggerName: string, id: number) {
        const newPost = {
            id,
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName,
        }
        posts.push(newPost)
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const post = postsRepository.findPostById(id)

        if (post) {
            post.title = title
            post.content = content
            post.bloggerId = bloggerId
            post.shortDescription = shortDescription
            return true
        } else {
            return false
        }
    }
}