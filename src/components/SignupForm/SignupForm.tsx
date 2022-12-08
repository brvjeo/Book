import React, {useContext, useId} from 'react';
import {Form, Formik} from 'formik';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import styles from './SignupForm.module.scss';
import {BUTTON_SIZE, DATABASE_ERRORS, INPUT_SIZE} from '../../enums';
import {ApplicationContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import {useDelay} from '../../hooks/useDelay';
import {svgLogo} from '../../svgSprite';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {Application} from "../../core/application";
import {authUser} from "../../store/user/userSlicer";
import {IUser} from '../../types';
import * as uuid from 'uuid';

type TProps = {
    onClose: () => void
}

export const SignupForm: React.FC<TProps> = ({onClose: closeModal}): React.ReactElement | null => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const application = useContext(ApplicationContext);

    const nameID = useId();
    const emailID = useId();
    const lastnameID = useId();
    const passwordID = useId();

    const signupHandler = <T extends {
        name: string,
        lastname: string,
        email: string,
        password: string
    }>(values: T) => {
        application.createUserWithEmailAndPassword(values.email, values.password)
            .then(
                async userCredential => {
                    const newUser = application.generateUser(userCredential.user.uid, values);
                    try{
                        await application.pushUser(newUser);
                        dispatch(authUser(newUser));
                        Application.setUserToStorage(newUser.uid);
                        navigate(`${newUser.uid}/articles`);
                    }catch (e) {
                        await application.deleteUser(userCredential.user);
                        return Promise.reject(e);
                    }
                }
            )
            .catch(console.log)
    }

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    lastname: '',
                    email: '',
                    password: ''
                }
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
                        <Button className={styles.button} type={'submit'} size={BUTTON_SIZE.M}>Create</Button>
                    </Form>
                )
            }
        </Formik>
    );
}