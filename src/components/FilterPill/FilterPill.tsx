import React from 'react';
import classNames from 'classnames';
import styles from './FilterPill.module.scss';
import {useToggle} from '../../hooks/useToggle';

type TProps = {
    children: string,
    className?: string
}

export const FilterPill: React.FC<TProps> = ({children, className}): React.ReactElement | null => {
    const {state, toggle} = useToggle(false);

    return (
        <div className={classNames(styles.pill, className, state && styles.pill_toggled)} onClick={toggle}>
            <span>
                {children}
            </span>
            {
                state && (
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.96585 2.56641L17.9659 18.5664Z" fill="black"/>
                        <path d="M1.96585 2.56641L17.9659 18.5664" stroke="black"/>
                        <path d="M1.96585 18.5664L17.9659 2.56641Z" fill="black"/>
                        <path d="M1.96585 18.5664L17.9659 2.56641" stroke="black"/>
                    </svg>
                )
            }
        </div>
    );
}