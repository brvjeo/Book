import React from 'react';
import styles from './Editor.module.scss';

export const EditorContext = React.createContext(false);

type Props = {
    isEditorMode: boolean,
};

export const Editor: React.FC<Props> = ({isEditorMode}) : React.ReactElement | null => {
    return (
        <EditorContext.Provider value={isEditorMode}>
            <div className={styles.editor}></div>
        </EditorContext.Provider>
    );
};