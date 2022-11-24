import styles from './Panel.module.scss';
import React from 'react';
import classNames from 'classnames';

type TProps = {
    children: React.ReactNode,
    className?: string
}

export const Panel: React.FC<TProps> = (
    {
        children,
        className
    }): React.ReactElement | null => {
    return (
        <div className={classNames(styles.panel, className)}>{children}</div>
    );
}