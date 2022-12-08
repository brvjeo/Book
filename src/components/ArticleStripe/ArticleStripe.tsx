import React from 'react';
import {IArticle} from "../../types";
import styles from './ArticleStripe.module.scss';
import {Avatar} from "../Avatar/Avatar";
import {svgEye} from "../../svgSprite";
import classNames from "classnames";
import {getShortName} from '../../utils/utils';

type TProps = {
    article: IArticle | null
}
export const ArticleStripe: React.FC<TProps> = ({article}): React.ReactElement | null => {
    return (
        <div className={styles.stripe}>
            <div className={styles.titleWrapper}>
                <div className={classNames(article ? styles.title : styles.title_isLoading)}>
                    {
                        !!article && article.info.title
                    }
                </div>
            </div>
            <div className={styles.infoGroup}>
                <div className={styles.user}>
                    <span className={classNames(article ? styles.username : styles.username_isLoading)}>
                        {
                            !!article && getShortName(article.info.user)
                        }
                    </span>
                    <Avatar/>
                </div>
                <span className={classNames(article ? styles.date : styles.date_isLoading)}>
                    {
                        !!article && article.info.date
                    }
                </span>
                <div className={classNames(article ? styles.views : styles.views_isLoading)}>
                    {
                        !!article && <span className={styles.viewsNumber}>{article.info.views}</span>
                    }
                    {
                        !!article && <div>{svgEye}</div>
                    }
                </div>
            </div>
        </div>
    )
}