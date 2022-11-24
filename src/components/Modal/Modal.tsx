import React from 'react';
import ReactDOM from 'react-dom'


type TProps = {
    children: React.ReactNode
}

export const Modal: React.FC<TProps> = ({children}): React.ReactElement | null => {
    const modal = ReactDOM.createPortal(children, document.getElementById('modal-container') as  HTMLElement);

    return modal;
}