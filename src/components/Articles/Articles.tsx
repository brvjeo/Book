import styles from './Articles.module.scss';
import React from 'react';

type Props = {
    children: React.ReactNode
};

export const Articles: React.FC<Props> = ({children}): React.ReactElement | null => {
    return (
        <div className={styles.articles}>
            {children}
        </div>
    );
};