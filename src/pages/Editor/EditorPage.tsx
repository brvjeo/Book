import React from 'react';
import {Layout} from '../../components/Layout/Layout';
import {Header} from '../../components/Header/Header';
import {Editor} from '../../components/Editor/Editor';
import styles from './EditorPage.module.scss';

type TProps = {}
export const EditorPage: React.FC<TProps> = (): React.ReactElement | null => {
    return (
        <Layout header={<Header/>}>
            <div className={styles.container}>
                <Editor/>
            </div>
        </Layout>
    );
}