import {useCallback, useState} from 'react';

export const useToggle = (initialValue: boolean) => {
    const [state, setValue] = useState(initialValue);

    const setTrue = useCallback(
        () => setValue(true),
        []
    );

    const setFalse = useCallback(
        () => setValue(false),
        []
    );

    const toggle = useCallback(
        () => setValue(value => !value),
        []
    );

    return {state, toggle, setTrue, setFalse};
}