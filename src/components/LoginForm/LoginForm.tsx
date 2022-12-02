import React, {useContext} from 'react';
import {Form, Formik} from 'formik';
import styles from './LoginForm.module.scss';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {BUTTON_SIZE, INPUT_SIZE} from '../../enums';
import {useToggle} from '../../hooks/useToggle';
import {SignupModal} from '../SignupModal/SignupModal';
import {useDelay} from '../../hooks/useDelay';
import {svgLogo} from '../../svgSprite';
import {useNavigate} from 'react-router-dom';
import {ApplicationContext} from '../../App';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {authUser} from '../../store/user/userSlicer';
import {Application} from "../../core/application";

type TFormValues = {
    email: string,
    password: string
}

type TErrorState = {
    dispatched: boolean,
    error: string | null
}

export const LoginForm = () => {
    const application = useContext(ApplicationContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const initialErrorState: TErrorState = {dispatched: false, error: null}
    const [errorState, setErrorState] = useDelay(initialErrorState, 12000);
    const {
        state: modalState,
        setTrue: setModalVisible,
        setFalse: setModalInvisible,
    } = useToggle(false);

    const emailID = React.useId();
    const passwordID = React.useId();

    const loginHandler = (values: TFormValues) => {
        application.signInWithEmailAndPassword(values.email, values.password)
            .then(
                async userCredential => {
                    try{
                        const user = await application.fetchUser(userCredential.user.uid);
                        Application.setUserToStorage(userCredential.user.uid);

                        dispatch(authUser(user));
                        navigate(`/${userCredential.user.uid}/articles`);
                    }catch (e){
                        await application.deleteUser(userCredential.user);
                        return e;
                    }
                }
            )
            .catch(
                e => console.log(JSON.stringify(e))
            );
    }

    return (
        <Formik
            initialValues={{email: '', password: ''} as TFormValues}
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
                    {
                        errorState.dispatched && <div className={styles.error}>{errorState.error}</div>
                    }
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