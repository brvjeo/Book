import React from 'react';
import styles from './ArticleCard.module.scss';
import {Button} from '../Button/Button';
import {IArticle} from '../../core/application';
import {Avatar} from '../Avatar/Avatar';

type TProps = {
    article?: IArticle
    isLoading?: boolean
}

export const ArticleCard: React.FC<TProps> = ({article, isLoading}): React.ReactElement | null => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={(!isLoading ? styles.date : styles.date_isLoading)}>{article && article.info.date}</span>
                <Avatar/>
                <span className={(!isLoading ? styles.user : styles.user_isLoading)}>{article && article.info.user.name + ' ' +  article.info.user.lastname[0].toUpperCase() + '.'}</span>
            </div>
            <div className={styles.content}>
                <h2 className={(!isLoading ? styles.title : styles.title_isLoading)}>{article && article.info.title}</h2>
            </div>
            <div className={styles.buttonGroup}>
                <Button type={'button'} isLoading={isLoading}>More</Button>
            </div>
        </div>
    );
}