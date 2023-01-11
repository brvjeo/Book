import React from 'react';
import {useFormik} from 'formik';
import {TFormValues} from '../../../../types/types';
import {Input} from '../../../../components/Input/Input';
import {Button} from '../../../../components/Button/Button';
import {BUTTON_SIZE} from '../../../../types/enums';
import {useLogin} from '../../hooks/useLogin';
import styles from './LoginForm.module.scss';

export type TLoginValues = Required<Pick<TFormValues, "email" | "password">>;

export const LoginForm = (): React.ReactElement | null => {
    const onSubmit = useLogin(
        ({message}) => console.log(message)
    );

    const formik = useFormik<TLoginValues>(
        {
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit
        }
    );

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
                placeholder={'Email'}
                type={'email'}
                name={'email'}
                onChange={formik.handleChange}/>
            <Input
                placeholder={'Password'}
                type={'password'}
                name={'password'}
                onChange={formik.handleChange}/>
            <Button type={'submit'} size={BUTTON_SIZE.L}>Login</Button>
        </form>
    );
}