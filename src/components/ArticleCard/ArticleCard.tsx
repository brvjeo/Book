import React from 'react';
import styles from './ArticleCard.module.scss';
import {Button} from '../Button/Button';
import {BUTTON_SIZE} from '../../enums';

type TProps = {
    article: any
}

export const ArticleCard: React.FC<TProps> = ({article}): React.ReactElement | null => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.date}>20-20-20</span>
                <span className={styles.user}>Jonh J.</span>
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>React vs Angular - Pros and Cons</h2>
            </div>
            <div className={styles.buttonGroup}>
                <Button type={'button'}>More</Button>
            </div>
        </div>
    );
}