import classNames from 'classnames';
import React, {BaseSyntheticEvent} from 'react';
import styles from './Button.module.scss';
import {BUTTON_SIZE} from '../../enums';

type TProps = {
    type: 'submit' | 'button',
    children: React.ReactNode,
    className?: string,
    id?: string,
    size?: BUTTON_SIZE,
    disabled?: boolean,
    onClick?: (e: BaseSyntheticEvent) => void
}

export const Button: React.FC<TProps> = (
    {
        type,
        children,
        className,
        id,
        size = BUTTON_SIZE.S,
        disabled,
        onClick
    }): React.ReactElement | null => {
    return (
        <button onClick={onClick} type={type} id={id} className={classNames(styles.button,styles[size],className)} disabled={disabled}>{children}</button>
    );
}