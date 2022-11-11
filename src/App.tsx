import React from 'react';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {Provider} from './StoreManager/components/Provider';
import {deployFirebase} from './firebase/firebase';
import {LoginFormValues} from './types';
import {UserCredential} from 'firebase/auth'

type FirebaseContextType = {
    signin: (values: LoginFormValues) => Promise<UserCredential>
}

const app = deployFirebase();
const initialValue: FirebaseContextType = {signin: app.signin.bind(app)};
export const FirebaseContext = React.createContext<FirebaseContextType>(initialValue);

export const App: React.FC = (): React.ReactElement | null => {
    return (
        <FirebaseContext.Provider value={initialValue}>
            <Provider>
                <LoginPage/>
            </Provider>
        </FirebaseContext.Provider>
    );
};