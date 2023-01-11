import React from 'react';
import {Panel} from '../../components/Panel/Panel';
import {LoginForm} from '../../features/authorization/components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = (): React.ReactElement | null => {
    return (
        <div className={styles.container}>
            <Panel className={styles.panel}>
                <LoginForm/>
            </Panel>
        </div>
    );
}

