import {Panel} from '../../components/Panel/Panel';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import {useAppSelector} from '../../store/hooks/useAppSelector';
import {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import {ApplicationContext} from '../../App';

export const LoginPage = () => {
    const application = useContext(ApplicationContext);

    return (
        <div className={styles.container}>
            <Panel className={styles.panel}>
                <LoginForm/>
            </Panel>
        </div>
    );
}

