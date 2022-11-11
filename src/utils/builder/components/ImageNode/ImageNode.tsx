import styles from './ImageNode.module.scss';
import React, {BaseSyntheticEvent, useCallback, useContext, useState} from 'react';
import {EditorContext} from '../../../../components/Editor/Editor';

type Props = {
    src: string
};

const articleNodeHandler = (e: BaseSyntheticEvent, setState: (state: number) => void) => {
    if(e.currentTarget !== null){
        setState(e.currentTarget.textContent?.length);
    }
}

export const ImageNode: React.FC<Props> = ({src}) : React.ReactElement | null => {
    const isEditable = useContext(EditorContext);
    const [state, setState] = useState<number>();

    const inputHandler = useCallback(
        (e: BaseSyntheticEvent) => articleNodeHandler(e, setState),
        []
    );

    if(state) return (
        <div suppressContentEditableWarning={true} onInput={inputHandler} contentEditable={isEditable} className={styles.image}>
            <img alt='img' src={src} width={'100%'}/>
        </div>
    );
    return null;
}