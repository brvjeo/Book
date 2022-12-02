import React from 'react';
import styles from './ArticlesList.module.scss';
import {IArticle} from '../../core/application';
import {ArticleStripe} from "../ArticleStripe/ArticleStripe";
import {emptyArray} from "../../utils/utils";

type TProps = {
    articles: IArticle[] | null
}

export const ArticlesList: React.FC<TProps> = ({articles}): React.ReactElement | null => {
    const loadingArticles = emptyArray(10).map((_, i) => <ArticleStripe key={i} article={null}/>)

    return (
        <div className={styles.list}>
            {
                !articles ? loadingArticles : (
                    articles.map(article => <ArticleStripe key={article.id} article={article}/>)
                )
            }
        </div>
    );
}