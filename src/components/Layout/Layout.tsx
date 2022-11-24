import React from 'react';
import styles from './Layout.module.scss';
import classNames from 'classnames';

type TProps = {
    children: React.ReactNode,
    header: React.ReactNode,
}

export const Layout: React.FC<TProps> = ({children, header}): React.ReactElement | null => {
    return (
        <>
            <header className={classNames('container', styles.header)}>
                {header}
            </header>
            <main className={classNames('container', styles.footer)}>
                {children}
            </main>
        </>
    );
}