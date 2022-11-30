import {Panel} from '../../components/Panel/Panel';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
    return (
        <div className={styles.container}>
            <Panel className={styles.panel}>
                <LoginForm/>
            </Panel>
        </div>
    );
}

