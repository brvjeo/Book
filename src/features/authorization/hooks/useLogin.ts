import {useApplication} from '../../../services/application/hooks/useApplication';
import {TLoginValues} from '../components/LoginForm/LoginForm';
import {useAuth} from './useAuth';


export function useLogin(onError: (e: Error) => void): (values: TLoginValues) => void {
    const application = useApplication();

    return useAuth<TLoginValues>(
        {
            redirect: '/articles',
            auth: values => {
                return application.login(values.email, values.password)
                    .then(
                        ({user}) => application.getUser(user.uid)
                    );
            },
            onError
        }
    );
}