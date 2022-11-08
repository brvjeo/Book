import React from 'react';
import styles from './Swiper.module.scss';
import {data} from '../../mock/mock';
import {ArticleCard} from '../ArticleCard/ArticleCard';

export const Swiper: React.FC = (): React.ReactElement | null => {
    return (
        <div className={styles.swiper}>
            {
                data.slice(0,23).map(article => <ArticleCard className={styles.card} key={article.user.id} article={article}/>)
            }
        </div>
    );
};