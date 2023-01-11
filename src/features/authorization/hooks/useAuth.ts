import {TFormValues} from '../../../types/types';
import {User} from '../../../services';
import {useNavigate} from 'react-router-dom';

export type TAuthOptions<T> = {
    redirect: string,
    onError: (e: Error) => void,
    auth: (values: T) => Promise<User>
}

export function useAuth<T extends TFormValues>({redirect, onError, auth}: TAuthOptions<T>) {
    const navigate = useNavigate();

    return (values: T) => {
        auth(values)
            .then(
                user => navigate(`${user.id}${redirect}`)
            )
            .catch(onError)
    }
}
