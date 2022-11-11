import React, {useCallback} from 'react';
import {StoreContext} from '../contexts';
import {IAction} from '../types';

export const useDispatch = () : (action: IAction) => void => {
    const store = React.useContext(StoreContext);

    return useCallback(store.dispatch.bind(store), [store]);
}