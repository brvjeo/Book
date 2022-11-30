import {useCallback, useState} from 'react';

export function useDelay<T>(initialValue: T, ms: number): [state: T, setState: (curr: T, next: T) => void] {
    const [state, setState] = useState(initialValue);

    const setValue = useCallback(
        (curr: T, next: T) => {
            setState(curr);
            setTimeout(
                () => setState(next),
                ms
            );
        },
        []
    );

    return [state, setValue];
}