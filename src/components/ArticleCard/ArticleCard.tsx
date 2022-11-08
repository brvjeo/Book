import React from 'react';
import styles from './ArticleCard.module.scss';
import {IArticle} from '../../types';
import classNames from 'classnames';

type Props = {
    article: IArticle,
    className: string
}

export const ArticleCard: React.FC<Props> = ({article, className}): React.ReactElement | null => {
    return (
        <div className={classNames(styles.articleCard, className)}>
            <header className={styles.header}>
                <span>{article.date}</span>
                <span>{article.user.name + ' ' + article.user.surname}</span>
            </header>
            <main className={styles.content}>
                <h4>{article.title}</h4>
                <div>
                    <button>More</button>
                </div>
            </main>
        </div>
    );
};