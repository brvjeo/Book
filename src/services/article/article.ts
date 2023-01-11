import {TID} from '../../types/types';
import {IUser} from '../user/user';
import {CONTENT_TYPE} from '../../types/enums';

export interface IArticleContent {
    id: string,
    nodes: IArticleNode[]
}

export interface IArticleNode {
    type: CONTENT_TYPE,
    content: string
}

export interface IArticle<U extends string | IUser, C extends string | IArticleContent> {
    id: TID,
    content: C,
    info: {
        user: U,
        date: string
        views: number
    },
    title: string
}

export class Article<U extends string | IUser, C extends string | IArticleContent> implements IArticle<U, C>{
    content: C;
    id: TID;
    info: { user: U; date: string; views: number };
    title: string;

    constructor(user: U, content: C, title: string) {
        this.id = crypto.randomUUID();
        this.content = content;
        this.title = title;
        this.info = {
            user,
            date: new Date().toLocaleDateString().split('/').join('-'),
            views: 0
        };
        this.title = title;
    }
}