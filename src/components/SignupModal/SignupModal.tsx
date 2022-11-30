import React from 'react';
import {Modal} from '../Modal/Modal';
import styles from './SignupModal.module.scss';
import {SignupForm} from '../SignupForm/SignupForm';
import {Panel} from '../Panel/Panel';
import {svgButtonClose} from '../../svgSprite';

type TProps = {
    onClose: () => void
}

export const SignupModal: React.FC<TProps> = ({onClose}): React.ReactElement | null => {
    return (
        <Modal>
            <div className={styles.container}>
                <Panel className={styles.panel}>
                    <button onClick={onClose} className={styles.button}>{svgButtonClose}</button>
                    <SignupForm onClose={onClose}/>
                </Panel>
            </div>
        </Modal>
    );
}