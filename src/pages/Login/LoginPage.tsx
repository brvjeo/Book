import {Panel} from '../../components/Panel/Panel';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import {useAppSelector} from '../../store/hooks/useAppSelector';
import {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import {ApplicationContext} from '../../App';
import {Application} from '../../core/application';
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const application = useContext(ApplicationContext);

    useEffect(
        () => {
            const userID = Application.getUserFromStorage();
            if(userID){
                navigate(`/${userID}/articles`);
            }
        },
        []
    );

    return (
        <div className={styles.container}>
            <Panel className={styles.panel}>
                <LoginForm/>
            </Panel>
        </div>
    );
}

