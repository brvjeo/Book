import React, {useContext, useId} from 'react';
import {Form, Formik} from 'formik';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import styles from './SignupForm.module.scss';
import {BUTTON_SIZE, INPUT_SIZE} from '../../enums';
import {ApplicationContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import {useDelay} from '../../hooks/useDelay';
import {svgLogo} from '../../svgSprite';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {Application} from "../../core/application";
import {authUser} from "../../store/user/userSlicer";

type TProps = {
    onClose: () => void
}
export type TFormValues = {
    name: string,
    lastname: string,
    email: string,
    password: string
}
type TErrorState = {
    dispatched: boolean,
    error: string | null
}

export const SignupForm: React.FC<TProps> = ({onClose: closeModal}): React.ReactElement | null => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const application = useContext(ApplicationContext);

    const initialErrorState: TErrorState = {dispatched: false, error: null};
    const [errorState, setErrorState] = useDelay(initialErrorState, 12000);

    const nameID = useId();
    const emailID = useId();
    const lastnameID = useId();
    const passwordID = useId();

    const signupHandler = (values: TFormValues) => {
        application.createUserWithEmailAndPassword(values.email, values.password)
            .then(
                async userCredential => {
                    try{
                        const user = Application.createUser(userCredential.user.uid, values);
                        await application.pushUser(userCredential.user.uid, user);

                        dispatch(authUser(user, []));
                        Application.setUserToStorage(userCredential.user.uid);
                        navigate(`/${userCredential.user.uid}/articles`);
                    }catch (e) {
                        await application.deleteUser(userCredential.user);
                        return Promise.reject(e);
                    }
                }
            )
            .catch(
                e => console.log(JSON.stringify(e))
            )
    }

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    lastname: '',
                    email: '',
                    password: ''
                } as TFormValues
            }
            onSubmit={signupHandler}>
            {
                ({values, errors, handleChange, handleBlur}) => (
                    <Form className={styles.form}>
                        <div className={styles.logo}>{svgLogo}</div>
                        <h1 className={styles.title}>Create your Book account</h1>
                        <label htmlFor={nameID}>Name</label>
                        <Input
                            className={styles.input}
                            name={'name'}
                            id={nameID}
                            value={values.name}
                            onChange={handleChange}
                            type={'text'}
                            size={INPUT_SIZE.L}/>
                        <label htmlFor={lastnameID}>Lastname</label>
                        <Input
                            className={styles.input}
                            name={'lastname'}
                            id={lastnameID}
                            value={values.lastname}
                            onChange={handleChange}
                            type={'text'}
                            size={INPUT_SIZE.L}/>
                        <label htmlFor={emailID}>Email</label>
                        <Input
                            className={styles.input}
                            name={'email'}
                            id={emailID}
                            value={values.email}
                            onChange={handleChange}
                            type={'email'}
                            size={INPUT_SIZE.L}/>
                        <label htmlFor={passwordID}>Password</label>
                        <Input
                            className={styles.input}
                            name={'password'}
                            id={passwordID}
                            value={values.password}
                            onChange={handleChange}
                            type={'password'}
                            size={INPUT_SIZE.L}/>
                        {
                            errorState.dispatched && <div className={styles.error}>{errorState.error}</div>
                        }
                        <Button className={styles.button} type={'submit'} size={BUTTON_SIZE.M}>Create</Button>
                    </Form>
                )
            }
        </Formik>
    );
}