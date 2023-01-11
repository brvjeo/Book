import React from 'react';
import {initializeApplication} from '../application';

type TProps = {
    children: React.ReactNode
}

const application = initializeApplication();
export const ApplicationContext = React.createContext(application);
export const ApplicationProvider: React.FC<TProps> = ({children}): React.ReactElement | null => {
    return (
        <ApplicationContext.Provider value={application}>
            {children}
        </ApplicationContext.Provider>
    );
}