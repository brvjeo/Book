import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {ApplicationProvider} from './services/application/context/ApplicationProvider';
import {NotFoundPage} from './pages/Not foundPage/NotFoundPage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LoginPage/>,
            errorElement: <NotFoundPage/>
        }
    ]
);

export const App: React.FC = (): React.ReactElement | null => {
    return (
        <ApplicationProvider>
            <RouterProvider router={router}/>
        </ApplicationProvider>
    );
}
