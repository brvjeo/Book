import React from 'react';
import styles from './Editor.module.scss';

type TProps = {}
export const Editor: React.FC<TProps> = (): React.ReactElement | null => {
    return (
        <div className={styles.editor}></div>
    );
};