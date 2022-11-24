import React from 'react';
import {Modal} from '../Modal/Modal';
import styles from './SignupModal.module.scss';
import {SignupForm} from '../SignupForm/SignupForm';
import {Panel} from '../Panel/Panel';

type TProps = {
    onClose: () => void
}

export const SignupModal: React.FC<TProps> = ({onClose}): React.ReactElement | null => {
    return (
        <Modal>
            <div className={styles.container}>
                <Panel className={styles.panel}>
                    <button onClick={onClose} className={styles.buttonClose}>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.96585 2.56641L17.9659 18.5664Z" fill="black"/>
                            <path d="M1.96585 2.56641L17.9659 18.5664" stroke="black"/>
                            <path d="M1.96585 18.5664L17.9659 2.56641Z" fill="black"/>
                            <path d="M1.96585 18.5664L17.9659 2.56641" stroke="black"/>
                        </svg>
                    </button>
                    <SignupForm onClose={onClose}/>
                </Panel>
            </div>
        </Modal>
    );
}