import {ARTICLE_NODE_TYPE} from './enums';
import {Values} from './components/LoginForm/LoginForm';

export interface IUser {
    name: string,
    surname: string,
    id: string,
    username: string,
}

export interface IArticleInfo {
    date: string,
    user: IUser,
    title: string,
    topics: string[],
    id: string
}

export interface IArticleContentNode{
    type: ARTICLE_NODE_TYPE,
    content: string
}

export type ArticleContent = Array<IArticleContentNode>;

export interface IArticle{
    id: string,
    content: ArticleContent,
    info: IArticleInfo
}

export type LoginFormValues = Values;