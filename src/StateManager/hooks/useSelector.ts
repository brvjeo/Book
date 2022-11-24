import React, {useEffect} from 'react';
import {StoreContext} from '../contexts/StoreContext';
import {IState} from '../../store/store';

export function useSelector<T>(selector: (state: IState) => T): T {
    const store = React.useContext(StoreContext);
    const id = React.useId();
    const [value, setValue] = React.useState(selector(store.state));

    useEffect(
        (): () => void => {
            return store.subscribe(id, (state) => setValue(selector(state)));
        },
        []
    );
    return value;
}