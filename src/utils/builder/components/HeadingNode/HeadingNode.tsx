import React, {BaseSyntheticEvent, useCallback, useContext, useState} from 'react';
import styles from './HeadingNode.module.scss';
import {EditorContext} from '../../../../components/Editor/Editor';

type Props = {
    content: string
}

const articleNodeHandler = (e: BaseSyntheticEvent, setState: (state: number) => void) => {
    if(e.currentTarget !== null){
        setState(e.currentTarget.textContent?.length);
    }
}

export const HeadingNode: React.FC<Props> = ({content}): React.ReactElement | null => {
    const isEditable = useContext(EditorContext);
    const [state, setState] = useState<number>();

    const inputHandler = useCallback(
        (e: React.BaseSyntheticEvent) => articleNodeHandler(e, setState),
        []
    );

    if(state) return (
        <div spellCheck={false} suppressContentEditableWarning={true} onInput={inputHandler} contentEditable={isEditable} className={styles.heading}>
            {content}
        </div>
    );

    return null;
}
