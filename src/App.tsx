import React, {useEffect} from 'react';
import {NotFoundPage} from './pages/Not found/NotFoundPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/Login/LoginPage';
import {ArticlesPage} from './pages/Articles/ArticlesPage';
import {DB_ROUTES, initializeFirebaseApp} from './firebase/firebase';
import {initializeApp, IUser} from './core/application';
import {useDispatch} from 'react-redux';
import {authenticateUserThunk} from './store/user/thunks/authenticateUserThunk';
import {useAppDispatch} from './store/hooks/useAppDispatch';

export const firebaseApp = initializeFirebaseApp();
export const application = initializeApp();

const initialValue = {firebaseApp, application};
export const AppContext = React.createContext(initialValue);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            const userIdFromStorage = localStorage.getItem('CURRENT_USER');
            if(userIdFromStorage == null) return;

            application.fetchUser(userIdFromStorage,
                (id) => firebaseApp.readDB(DB_ROUTES.users, id)
            ).then(
                (userRecord) => {
                    if(userRecord !== null){
                        dispatch(authenticateUserThunk(userRecord.user));
                    }
                }
            );
        },
        []
    );

    return (
        <AppContext.Provider value={initialValue}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                    <Route path={'/:userID/articles'} element={<ArticlesPage/>}/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
