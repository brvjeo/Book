import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = (): React.ReactElement | null => {
    return (
        <div className={styles.container}>
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
    );
}