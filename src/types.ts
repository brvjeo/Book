import {CONTENT_TYPE} from './enums';

export type TArticleInfo = {
    user: IUser,
    date: string,
    views: number,
    topics: string[],
    title: string
}

export type TArticleRecord = {
    id: string,
    content: string,
    info: {
        user: string,
        date: string,
        views: number,
        topics: string[],
        title: string
    }
}
export interface IUser {
    uid: string,
    id: string,
    name: string,
    lastname: string,
    email: string
    articles: string[],
    viewed: string[]
}
export interface IArticle {
    id: string,
    content: string,
    info: TArticleInfo
}
export interface IArticleContent {
    id: string,
    nodes: IArticleNode[]
}
export interface IArticleNode {
    type: CONTENT_TYPE,
    content: string
}