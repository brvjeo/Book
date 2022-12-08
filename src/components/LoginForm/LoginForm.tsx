import React, {useContext} from 'react';
import {Form, Formik} from 'formik';
import styles from './LoginForm.module.scss';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {BUTTON_SIZE, DATABASE_ERRORS, INPUT_SIZE} from '../../enums';
import {useToggle} from '../../hooks/useToggle';
import {SignupModal} from '../SignupModal/SignupModal';
import {useDelay} from '../../hooks/useDelay';
import {svgLogo} from '../../svgSprite';
import {useNavigate} from 'react-router-dom';
import {ApplicationContext} from '../../App';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {authUser} from '../../store/user/userSlicer';
import {Application} from "../../core/application";


export const LoginForm = () => {
    const application = useContext(ApplicationContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        state: modalState,
        setTrue: setModalVisible,
        setFalse: setModalInvisible,
    } = useToggle(false);

    const emailID = React.useId();
    const passwordID = React.useId();

    const loginHandler = <T extends { email: string, password: string }>(values: T) => {
        application.signInWithEmailAndPassword(values.email, values.password)
            .then(
                async userCredential => {
                    try {
                        const user = await application.fetchUser(userCredential.user.uid);

                        dispatch(authUser(user));
                        Application.setUserToStorage(user.uid);
                        navigate(`${user.uid}/articles`);
                    }catch (e) {
                        return Promise.reject(e);
                    }
                }
            )
            .catch(console.log);
    }

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={loginHandler}
        >{
            ({handleChange, values}) => (
                <Form className={styles.form}>
                    <div className={styles.logo}>{svgLogo}</div>
                    <label htmlFor={emailID}>Email</label>
                    <Input
                        className={styles.input}
                        name={'email'}
                        type={'email'}
                        id={emailID}
                        value={values.email}
                        onChange={handleChange}
                        size={INPUT_SIZE.L}/>
                    <label htmlFor={passwordID}>Password</label>
                    <Input
                        className={styles.input}
                        name={'password'}
                        type={'password'}
                        id={passwordID}
                        value={values.password}
                        onChange={handleChange}
                        size={INPUT_SIZE.L}/>
                    <Button className={styles.button} type={'submit'} size={BUTTON_SIZE.L}>Log in</Button>
                    <Button className={styles.button} type={'button'} size={BUTTON_SIZE.L} onClick={setModalVisible}>Sign
                        up</Button>
                    {
                        modalState && <SignupModal onClose={setModalInvisible}/>
                    }
                </Form>
            )
        }
        </Formik>
    );
}