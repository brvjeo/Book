import React, {BaseSyntheticEvent} from 'react';
import {BUTTON_SIZE} from '../../enums';
import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
    children: React.ReactNode,
    onClick?: (e: BaseSyntheticEvent) => void,
    size: BUTTON_SIZE,
    className?: string,
    submit?: boolean,
    form?: string
}

export const Button: React.FC<Props> =
    ({
         form,
         submit,
         children,
         onClick,
         size,
         className
     }): React.ReactElement | null => {
        return (
            <button
                type={submit ? 'submit' : 'button'}
                form={form}
                className={classNames(styles.button, styles[size], className)}
            >
                {children}
            </button>
        );
    }