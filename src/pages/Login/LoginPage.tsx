import {Panel} from '../../components/Panel/Panel';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import {useEffect} from 'react';
import {Application} from '../../core/application';
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();

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

