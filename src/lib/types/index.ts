// ================= user Params

export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    avater: string
}

export type CreateTwittParams = {
    userId: string
    content: string
    parentId?: string
    children?:string
}