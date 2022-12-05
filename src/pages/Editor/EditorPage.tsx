import React, {BaseSyntheticEvent, useCallback, useState} from 'react';
import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import styles from './EditorPage.module.scss';
import {Button} from "../../components/Button/Button";
import {BUTTON_SIZE} from "../../enums";
import {Input} from "../../components/Input/Input";

type TProps = {}
type TEditorState = {
    title: string,
    content: string
}
export const EditorPage: React.FC<TProps> = (): React.ReactElement | null => {
    const [state, setState] = useState<TEditorState>(
        {
            title: '',
            content: ''
        }
    );

    const titleHandler = useCallback(
        (e: BaseSyntheticEvent) => {
            setState(
                state => {
                    state.title = e.target.value;
                    return state;
                }
            )
        },
        []
    );

    const contentHandler = useCallback(
        (e: BaseSyntheticEvent) => {
            setState(
                state => {
                    state.content = e.target.value;
                    return state;
                }
            )
        },
        []
    )

    return (
        <Layout header={(
            <Header>
                {
                    route => <Button onClick={() => console.log(state)} size={BUTTON_SIZE.M}>Save</Button>
                }
            </Header>
        )}>
            <div className={styles.container}>
                <div className={styles.editor}>
                    <Input onChange={titleHandler} className={styles.input} type={'text'}/>
                    <Input onChange={contentHandler} className={styles.textarea} type={'text'} isMultiline={true}/>
                </div>
            </div>
        </Layout>
    );
}