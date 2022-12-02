import React, {useContext, useEffect, useState} from 'react';
import styles from './ArticlesList.module.scss';
import {ApplicationContext} from '../../App';
import {IArticle} from '../../core/application';

type TProps = {
    articles: IArticle[] | null
}

export const ArticlesList: React.FC<TProps> = ({articles}): React.ReactElement | null => {
    const application = useContext(ApplicationContext);

    return (
        <div className={styles.list}>Articles</div>
    );
}