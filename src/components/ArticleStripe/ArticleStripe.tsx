import styles from './ArticleStripe.module.scss';
import React from 'react';
import {IArticleInfo} from '../../types';

type Props = {
    article: IArticleInfo
};

export const ArticleStripe: React.FC<Props> = ({article}) : React.ReactElement | null => {
    return (
        <div className={styles.stripe}>
            <span className={styles.title}>{article.title}</span>
            <span className={styles.user}>{article.user.name + ' ' + article.user.surname}</span>
        </div>
    );
};