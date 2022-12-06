import React, {BaseSyntheticEvent, useCallback, useContext, useState} from 'react';
import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import styles from './EditorPage.module.scss';
import {Button} from "../../components/Button/Button";
import {BUTTON_SIZE} from "../../enums";
import {Input} from "../../components/Input/Input";
import {ApplicationContext} from "../../App";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {authUser} from "../../store/user/userSlicer";

type TProps = {}
export type TEditorState = {
    title: string,
    content: string
}
export const EditorPage: React.FC<TProps> = (): React.ReactElement | null => {
    const {userID: uid} = useParams();
    const navigate = useNavigate();
    const application = useContext(ApplicationContext);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser);
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

    const createArticleHandler = async () => {
        if (user !== null && uid !== undefined) {
            try {
                const currentUser = await application.createArticle(uid, user, state);
                dispatch(authUser(currentUser));
                navigate(`/${uid}/articles`);
            }catch (e) {
                console.log(e);
            }
        }
    }

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
                    route => <Button onClick={createArticleHandler} size={BUTTON_SIZE.M}>Save</Button>
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