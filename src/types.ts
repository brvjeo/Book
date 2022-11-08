export interface IArticle{
    date: string,
    user: IUser,
    title: string
}

export interface IUser{
    name: string,
    surname: string,
    id: string,
    username: string,
}
