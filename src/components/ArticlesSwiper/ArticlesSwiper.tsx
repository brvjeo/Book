import React from 'react';
import styles from './ArticlesSwiper.module.scss';
import {IArticle} from "../../core/application";
import {ArticleCard} from "../ArticleCard/ArticleCard";

type TProps = {
    articles: IArticle[] | null,
    isLoading?: boolean
}

export const ArticlesSwiper: React.FC<TProps> = ({articles, isLoading}): React.ReactElement | null => {
    const loadingArticles = [0, 1, 2, 3].map(key => <ArticleCard key={key} isLoading={true}/>)

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