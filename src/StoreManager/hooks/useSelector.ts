import React from 'react';
import {StoreContext} from '../contexts';
import {IState} from '../types';

export function useSelector<T>(selector: (state: IState) => T): T | undefined {
    const store = React.useContext(StoreContext);
    const id: string = React.useId();
    const [localState, setLocalState] = React.useState<T | undefined>();

    React.useEffect(
        () => {
            return store.subscribe(id, (state) => setLocalState(selector(state)))
        },
        []
    );

    return localState;
}