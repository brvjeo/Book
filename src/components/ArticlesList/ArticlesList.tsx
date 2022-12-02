import React from 'react';
import styles from './ArticlesList.module.scss';
import {IArticle} from '../../core/application';
import {ArticleStripe} from "../ArticleStripe/ArticleStripe";

type TProps = {
    articles: IArticle[] | null
}

export const ArticlesList: React.FC<TProps> = ({articles}): React.ReactElement | null => {

    const showLoadingArticles = (): React.ReactElement[] => {
        return new Array(10).fill(0).map((_,i) => <ArticleStripe key={i} article={null}/>)
    }

    return (
        <div className={styles.list}>
            {
                !articles ? showLoadingArticles() : (
                    articles.map(article => <ArticleStripe key={article.id} article={article}/>)
                )
            }
        </div>
    );
}