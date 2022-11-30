import React, {useContext, useId} from 'react';
import {Form, Formik} from 'formik';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import styles from './SignupForm.module.scss';
import {BUTTON_SIZE, INPUT_SIZE} from '../../enums';
import {AppContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import {DB_ROUTES} from '../../firebase/firebase';
import {useDelay} from '../../hooks/useDelay';
import {svgLogo} from '../../svgSprite';
import {useAppDispatch} from '../../store/hooks/useAppDispatch';
import {authUser} from '../../store/user/userSlicer';

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
    const {firebaseApp, application} = useContext(AppContext);

    const initialErrorState: TErrorState = {dispatched: false, error: null};
    const [errorState, setErrorState] = useDelay(initialErrorState, 12000);

    const nameID = useId();
    const emailID = useId();
    const lastnameID = useId();
    const passwordID = useId();

    const signupHandler = (values: TFormValues) => {
        firebaseApp.createUserWithEmailAndPassword(values.email, values.password)
            .then(
                ({user}) => {
                    const user_ = application.createUser(user.uid, values);
                    const uid_ = user.uid;
                    return firebaseApp.writeDB(DB_ROUTES.users, user.uid, user_)
                        .then(
                            () => {
                                dispatch(authUser(user_));
                                application.setUserToStorage(uid_);
                                navigate(`/${user_.id}/articles`);
                            }
                        )
                        .catch(
                            e => firebaseApp.deleteUser(user).then(() => console.log('no access to DB'))
                        );
                }
            )
            .catch(e => {
                if (e.message) {
                    setErrorState(
                        {
                            dispatched: true,
                            error: e.message
                        },
                        initialErrorState
                    )
                } else {
                    console.log(e);
                }
            });
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