import React from 'react';
import {NotFoundPage} from './pages/Not found/NotFoundPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/Login/LoginPage';
import {initializeFirebaseApp} from './firebase/firebase';
import {Provider} from './StateManager/components/Provider/Provider';
import {store} from './store/store';
import {initializeApp} from './core/application';
import {ArticlesPage} from './pages/Articles/ArticlesPage';

const firebaseApp = initializeFirebaseApp();
const application = initializeApp();
const defaultContext = {firebaseApp, application};

export const AppContext = React.createContext(defaultContext);

export const App = () => {
    return (
        <AppContext.Provider value={defaultContext}>
            <Provider value={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<LoginPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                        <Route path={'/:userID/articles'} element={<ArticlesPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </AppContext.Provider>
    );
}
