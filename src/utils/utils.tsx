import {IArticleContent, IArticleNode, IUser, TArticleRecord} from "../types";
import {CONTENT_TYPE} from '../enums';
import {QuerySnapshot, DocumentData} from 'firebase/firestore';

export const getShortName = ({name, lastname}: IUser): string => {
    return name.slice(0, 1).toUpperCase() + name.slice(1) + ' ' + lastname[0].toUpperCase() + '.';
}

export const emptyArray = (length: number): number[] => new Array(length).fill(0);

export const articleIsNotEmpty = (article: TArticleRecord | null): boolean => (article !== null && !!Object.values(article).length);

export const buildArticle = (title: string, content: string): IArticleNode[] => {
    const paragraphs = content.split('\n').filter(str => !!str.length).map(
        (paragraph): IArticleNode => (
            {
                type: CONTENT_TYPE.paragraph,
                content: paragraph
            }
        )
    );

    return [
        {
            type: CONTENT_TYPE.title,
            content: title
        },
        ...paragraphs
    ] as IArticleNode[];
}

export const parseArticle = (content: IArticleContent): JSX.Element[] => {
    const parser = {
        [CONTENT_TYPE.title]: (content: string): JSX.Element => {
            return <h1 className='article-title'>{content}</h1>;
        },
        [CONTENT_TYPE.paragraph]: (content: string): JSX.Element => {
            return <p className='article-paragraph'>{content}</p>;
        }
    }

    return content.nodes.map(node => parser[node.type](node.content));
}

export function readSnapshot<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
    const output: T[] = [];

    if(snapshot.empty) return output;

    snapshot.forEach(
        doc => {
            if (doc.exists()) {
                output.push(doc.data() as T);
            }
        }
    )

    return output;
}

export const isArticleRecord = (article: any): article is TArticleRecord => {
    return typeof article.info.user === 'string';
}