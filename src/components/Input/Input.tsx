import styles from './Input.module.scss';
import classNames from 'classnames';
import React from 'react';
import {INPUT_SIZE} from '../../enums';

type TProps = {
    type: 'email' | 'text' | 'password',
    id?: string,
    className?: string,
    value?: string,
    defaultValue?: string,
    onChange?: (e: React.BaseSyntheticEvent) => void,
    placeholder?: string,
    name?: string,
    size?: INPUT_SIZE,
    disabled?: boolean
}

export const Input: React.FC<TProps> = (
    {
        type,
        id,
        className,
        value,
        defaultValue,
        onChange,
        placeholder,
        name,
        size = INPUT_SIZE.S,
        disabled
    }): React.ReactElement | null => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className={classNames(styles.input, styles[size], className)}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}