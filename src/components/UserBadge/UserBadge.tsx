import React from 'react';
import {IUser} from '../../types';
import styles from './UserBadge.module.scss';
import {Avatar} from '../Avatar/Avatar';
import {AVATAR_SIZE} from '../../enums';
import classNames from 'classnames';

type TProps = {
    className?: string
    user: IUser | null
}

export const UserBadge: React.FC<TProps> = ({className, user}) : React.ReactElement | null => {
    return (
        <div className={classNames(styles.badge, className)}>
            <Avatar className={styles.avatar} size={AVATAR_SIZE.L}/>
            <div className={styles.username}>
                {
                    user && user.name + ' ' + user.lastname
                }
            </div>
            <div className={styles.email}>
                <a href={`mailto:${user && user.email}`}>
                    {
                        user && user.email
                    }
                </a>
            </div>
        </div>
    )
}