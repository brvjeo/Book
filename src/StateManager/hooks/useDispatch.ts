import {StoreContext} from '../contexts/StoreContext';
import React from 'react';

export const useDispatch = () => {
    const store = React.useContext(StoreContext);

    return store.dispatch.bind(store);
}