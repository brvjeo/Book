import React from 'react';

type Props = {
    children: React.ReactNode
    header: React.ReactNode,
    footer: React.ReactNode
};

export const Layout: React.FC<Props> = ({children, footer, header}): React.ReactElement | null => {
    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    );
};