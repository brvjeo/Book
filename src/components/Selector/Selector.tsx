import React, {BaseSyntheticEvent, useState} from 'react';
import styles from './Selector.module.scss';
import {useToggle} from '../../hooks/useToggle';
import classNames from 'classnames';

type TProps = {
    options: string[],
    placeholder: string
}

export const Selector: React.FC<TProps> = ({options, placeholder}): React.ReactElement | null => {
    const {state: isVisible, toggle} = useToggle(false);
    const [state, setState] = useState(placeholder);
    const [values, setValues] = useState([...new Set(options)]);

    const selectorHandler = (e: BaseSyntheticEvent) => {
        setState(state => {
            setValues(
                values => {
                    if (placeholder !== state) {
                        values.push(state);
                    }
                    return values.filter(value => value !== e.target.textContent);
                }
            );

            return e.target.textContent;
        });

        toggle();
    }

    return (
        <div className={classNames(styles.selector, isVisible && styles.button_opened)}>
            <div className={classNames(styles.button)} onClick={toggle}>
                <span>{state}</span>
                <svg className={classNames(isVisible && styles.svg_rotated)} width="12" height="8" viewBox="0 0 12 8"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.99948 5.79811L1.47528 1.24902C1.13765 0.90919 0.590283 0.90919 0.252699 1.24902C-0.0848842 1.58881 -0.0848842 2.1398 0.252699 2.47968L5.34478 7.59973C5.52467 7.78082 5.76396 7.86231 5.99948 7.8504C6.23505 7.86231 6.47432 7.78082 6.65423 7.59973L11.7463 2.47968C12.0839 2.13983 12.0839 1.58888 11.7463 1.24902C11.4087 0.909169 10.8613 0.90919 10.5238 1.24902L5.99948 5.79811Z"
                        fill="black"/>
                </svg>
            </div>
            {
                isVisible && (
                    <div className={classNames(styles.list, isVisible && styles.list_opened)}>
                        {
                            values.map(option => (
                                <div key={option} className={styles.option} onClick={selectorHandler}>
                                    <span>{option}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}