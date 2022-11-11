import React from 'react';
import {ParagraphNode} from './components/ParagraphNode/ParagraphNode';
import {HeadingNode} from './components/HeadingNode/HeadingNode';
import {ImageNode} from './components/ImageNode/ImageNode';
import {ARTICLE_NODE_TYPE} from '../../enums';
import {ArticleContent} from '../../types';

const builder = {
    [ARTICLE_NODE_TYPE.paragraph]: (content: string, key: number): React.ReactElement => {
        return <ParagraphNode key={key} content={content}/>
    },
    [ARTICLE_NODE_TYPE.heading]: (content: string, key: number): React.ReactElement => {
        return <HeadingNode key={key} content={content}/>
    },
    [ARTICLE_NODE_TYPE.image]: (content: string, key: number): React.ReactElement => {
        return <ImageNode key={key} src={content}/>
    }
}

export default function (article: ArticleContent): React.ReactElement[]{
    return article.map((node, index) => builder[node.type](node.content, index));
}