import React from 'react';
import {StoreContext} from '../contexts';
import {store} from '../../store/store';

type Props = {
    children: React.ReactNode
}

export const Provider: React.FC<Props> = ({children}) : React.ReactElement | null => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
}