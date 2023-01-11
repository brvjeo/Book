import classNames from 'classnames';
import React, {BaseSyntheticEvent} from 'react';
import styles from './Button.module.scss';
import {BUTTON_SIZE} from '../../types/enums';

type TProps = {
    type?: 'submit' | 'button',
    children: React.ReactNode,
    className?: string,
    id?: string,
    size?: BUTTON_SIZE,
    disabled?: boolean,
    onClick?: (e: BaseSyntheticEvent) => void,
    isLoading?: boolean
}

export const Button: React.FC<TProps> = (
    {
        type = 'button',
        children,
        className,
        id,
        size = BUTTON_SIZE.S,
        disabled,
        onClick,
        isLoading
    }): React.ReactElement | null => {
    return (
        <button onClick={onClick} type={type} id={id} className={classNames(styles.button,styles[size],className, isLoading && styles.button_isLoading)} disabled={disabled}>{children}</button>
    );
}