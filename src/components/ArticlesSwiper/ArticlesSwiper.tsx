import React from 'react';
import styles from './ArticlesSwiper.module.scss';
import {IArticle} from "../../types";
import {ArticleCard} from "../ArticleCard/ArticleCard";
import {emptyArray} from "../../utils/utils";

type TProps = {
    articles: IArticle[] | null,
    isLoading?: boolean
}

export const ArticlesSwiper: React.FC<TProps> = ({articles, isLoading}): React.ReactElement | null => {
    const loadingArticles = emptyArray(4).map((_,i) => <ArticleCard key={i} article={null}/>);

    const articlesViewer = () => {
        if (articles === null) {
            return loadingArticles;
        } else if (!articles.length) {
            return <div className={styles.title}>No recent articles</div>
        } else {
            return articles.map(article => <ArticleCard key={article.id} article={article}/>)
        }
    }

    return (
        <div className={styles.swiper}>
            {
                articlesViewer()
            }
        </div>
    );
}