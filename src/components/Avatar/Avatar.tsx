import React from 'react';
import {AVATAR_SIZE} from '../../types/enums';
import styles from './Avatar.module.scss';
import classNames from 'classnames';

type TProps = {
    size?: AVATAR_SIZE,
    className?: string
}

export const Avatar: React.FC<TProps> = ({size = AVATAR_SIZE.S, className}): React.ReactElement | null => {
    return (
        <div className={classNames(styles.avatar, styles[size], className)}></div>
    );
}