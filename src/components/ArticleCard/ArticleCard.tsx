import React from 'react';
import styles from './ArticleCard.module.scss';
import {Button} from '../Button/Button';
import {IArticle, IUser} from '../../core/application';
import {Avatar} from '../Avatar/Avatar';
import {getShortName} from "../../utils/utils";

type TProps = {
    article: IArticle | null
}

export const ArticleCard: React.FC<TProps> = ({article}): React.ReactElement | null => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={(article ? styles.date : styles.date_isLoading)}>
                    {
                        !!article && article.info.date
                    }
                </span>
                <Avatar/>
                <span className={(article ? styles.user : styles.user_isLoading)}>
                    {
                        article && getShortName(article.info.user)
                    }
                </span>
            </div>
            <div className={styles.content}>
                <h2 className={(article ? styles.title : styles.title_isLoading)}>
                    {
                        article && article.info.title
                    }
                </h2>
            </div>
            <div className={styles.buttonGroup}>
                <Button type={'button'} isLoading={!article}>More</Button>
            </div>
        </div>
    );
}