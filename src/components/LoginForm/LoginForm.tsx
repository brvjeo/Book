import React, {useCallback, useContext, useId, useState} from 'react';
import styles from './LoginForm.module.scss';
import {Button} from '../Button/Button';
import {BUTTON_SIZE} from '../../enums';
import {Field, Form, Formik} from 'formik';
import {FirebaseContext} from '../../App';

export type Values = {
    email: string,
    password: string
}

type ResponseState = {
    error: string | undefined,
    dispatched: boolean
}

export const LoginForm: React.FC = (): React.ReactElement | null => {
    const app = useContext(FirebaseContext);
    const [state, setState] = useState<ResponseState>({
        error: undefined,
        dispatched: false
    });

    const emailID = useId();
    const passwordID = useId();
    const formID = useId();

    const showErrorMessage = useCallback(
        (msg: string | undefined) : React.ReactNode => {
            setTimeout(() => setState({
                dispatched: false,
                error: undefined
            }), 3000);
            return <div className={styles.errorMsg}>{msg}</div>
        },
        []
    );
    const validate = useCallback(
        (values: Values) => {
            const errors = {} as Values;
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        []
    );

    return (
        <div className={styles.container}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values: Values) => {
                    app.signin(values)
                        .then(({user}) => {
                            console.log(user);
                        })
                        .catch((error) => {
                            setState({
                                dispatched: true,
                                error: error.message
                            });
                        });
                }}
                validate={validate}
            >{
                ({touched, errors}) => (
                    <Form id={formID}>
                        <label htmlFor={emailID}>Email</label>
                        <Field type='email' className={styles.input} id={emailID} name='email' required={true}/>
                        {
                            (!!touched.email && !!errors.email) && <div className={styles.errorMsg}>{errors.email}</div>
                        }
                        <label htmlFor={passwordID}>Password</label>
                        <Field type='password' className={styles.input} id={passwordID} name='password'
                               required={true}/>
                        {
                            state.dispatched && showErrorMessage(state.error)
                        }
                        <Button
                            className={styles.signin}
                            submit={true}
                            form={formID}
                            size={BUTTON_SIZE.L}>Sign in</Button>
                        <Button
                            className={styles.signup}
                            size={BUTTON_SIZE.L}>Sign up</Button>
                    </Form>
                )
            }
            </Formik>
        </div>
    );
}