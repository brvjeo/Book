import styles from './Workspace.module.scss';
import React from 'react';

type Props = {
    children: React.ReactNode
}

export const Workspace: React.FC<Props> = ({children}) : React.ReactElement | null => {
    return (
        <div className={styles.workspace}>
            {children}
        </div>
    );
}