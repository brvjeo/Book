import {useCallback, useState} from 'react';

export const useToggle = (initialValue: boolean) => {
    const [state, setValue] = useState(initialValue);

    const toggle = useCallback(
        () => setValue(value => !value),
        []
    );

    return {state, toggle};
}