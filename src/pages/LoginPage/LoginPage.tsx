import React from 'react';
import styles from './LoginPage.module.scss';
import {LoginForm} from '../../components/LoginForm/LoginForm';

export const LoginPage: React.FC = (): React.ReactElement | null => {
    return (
        <div className={styles.container}>
            <LoginForm/>
        </div>
    );
}