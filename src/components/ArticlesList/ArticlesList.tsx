import React from 'react';
import styles from './ArticlesList.module.scss';
import {IArticle} from '../../types';
import {ArticleStripe} from "../ArticleStripe/ArticleStripe";
import {emptyArray} from "../../utils/utils";
import {Link} from 'react-router-dom';

type TProps = {
    articles: IArticle[] | null
}

export const ArticlesList: React.FC<TProps> = ({articles}): React.ReactElement | null => {
    const loadingArticles = emptyArray(10).map((_, i) => <ArticleStripe key={i} article={null}/>)

    return (
        <div className={styles.list}>
            {
                !articles ? loadingArticles : (
                    articles.map(article => (
                        <Link key={article.id} to={`${article.id}`}>
                            <ArticleStripe article={article}/>
                        </Link>
                    ))
                )
            }
        </div>
    );
}