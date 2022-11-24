import {StoreContext} from '../../contexts/StoreContext';

export const Provider = ({value, children}) => {
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}