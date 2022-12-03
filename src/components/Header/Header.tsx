import React from 'react';
import styles from './Header.module.scss';
import {Link, useParams} from 'react-router-dom';
import {Button} from '../Button/Button';
import {Avatar} from '../Avatar/Avatar';
import {BUTTON_SIZE} from '../../enums';

export const Header: React.FC = (): React.ReactElement | null => {
    const {userID} = useParams();

    return (
        <div className={styles.wrapper}>
            <Link to={`/${userID}/editor`}>
                <Button size={BUTTON_SIZE.M}>Create</Button>
            </Link>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <svg width="91" height="22" viewBox="0 0 91 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2256 21H0.837891V16.5312H3.28809V5.27051H1.18066V0.776367H11.502C13.1777 0.776367 14.6081 0.911784 15.793 1.18262C16.9525 1.46191 17.875 1.99512 18.5605 2.78223C19.2461 3.56087 19.5889 4.66536 19.5889 6.0957C19.5889 7.10286 19.2969 7.97884 18.7129 8.72363C18.1289 9.46842 17.3883 10.0059 16.4912 10.3359C17.6676 10.8438 18.5352 11.4997 19.0938 12.3037C19.6608 13.1077 19.9443 14.2122 19.9443 15.6172C19.9443 17.3353 19.2715 18.6641 17.9258 19.6035C16.5885 20.5345 14.6885 21 12.2256 21ZM9.78809 5.27051V8.93945H10.4863C11.4512 8.93945 12.1621 8.80404 12.6191 8.5332C13.0846 8.26237 13.3174 7.75456 13.3174 7.00977C13.3174 6.49349 13.1566 6.07454 12.835 5.75293C12.5133 5.43132 12.0944 5.27051 11.5781 5.27051H9.78809ZM9.78809 12.2656V16.5312H10.2451C11.2692 16.5312 12.0563 16.3874 12.6064 16.0996C13.165 15.8118 13.4443 15.2194 13.4443 14.3223C13.4443 12.9342 12.598 12.2402 10.9053 12.2402C10.7191 12.2402 10.5329 12.2445 10.3467 12.2529C10.1605 12.2529 9.97428 12.2572 9.78809 12.2656ZM32.5127 21.2539C31.0908 21.2539 29.7578 21.0635 28.5137 20.6826C27.3372 20.3018 26.3132 19.7855 25.4414 19.1338C24.6289 18.4736 23.918 17.6823 23.3086 16.7598C22.75 15.8796 22.3268 14.9189 22.0391 13.8779C21.7767 12.8623 21.6455 11.7874 21.6455 10.6533C21.6455 8.8929 21.8529 7.36523 22.2676 6.07031C22.6484 4.79232 23.2832 3.68359 24.1719 2.74414C25.0013 1.86393 26.127 1.18262 27.5488 0.700195C28.9876 0.243164 30.6592 0.0146484 32.5635 0.0146484V4.22949L32.5381 4.25488C31.9202 4.25488 31.3405 4.35221 30.7988 4.54688C30.2572 4.74154 29.8424 4.99121 29.5547 5.2959C29.2161 5.67676 28.9538 6.03223 28.7676 6.3623C28.5475 6.7347 28.3825 7.1748 28.2725 7.68262C28.2132 7.97884 28.1667 8.24544 28.1328 8.48242C28.099 8.7194 28.0778 8.93099 28.0693 9.11719C28.0355 9.39648 28.0186 9.90007 28.0186 10.6279C28.0186 11.3304 28.0524 11.944 28.1201 12.4688C28.1878 12.9342 28.3275 13.5055 28.5391 14.1826C28.7422 14.792 29.0088 15.2871 29.3389 15.668C29.6689 16.0996 30.0964 16.4297 30.6211 16.6582C31.1543 16.9206 31.7848 17.0518 32.5127 17.0518V21.2539ZM43.7988 6.07031C44.2135 7.36523 44.4209 8.8929 44.4209 10.6533C44.4209 11.8128 44.2812 12.8962 44.002 13.9033C43.7565 14.9105 43.3418 15.8711 42.7578 16.7852C42.1992 17.64 41.4883 18.4229 40.625 19.1338C39.7533 19.7855 38.7292 20.3018 37.5527 20.6826C36.2747 21.0635 34.9417 21.2539 33.5537 21.2539V17.0518C34.2731 17.0518 34.8994 16.9206 35.4326 16.6582C35.9827 16.4128 36.4144 16.0827 36.7275 15.668C37.083 15.2025 37.3411 14.7074 37.502 14.1826C37.7305 13.5479 37.8701 12.9766 37.9209 12.4688C38.0055 11.8509 38.0479 11.2373 38.0479 10.6279C38.0479 10.4163 38.0436 10.1878 38.0352 9.94238C38.0267 9.68848 38.014 9.41341 37.9971 9.11719C37.9548 8.77865 37.9167 8.49089 37.8828 8.25391C37.849 8.00846 37.8193 7.81803 37.7939 7.68262C37.7093 7.22559 37.5443 6.78548 37.2988 6.3623C37.0703 5.93913 36.8037 5.58366 36.499 5.2959C36.1689 4.94043 35.75 4.68229 35.2422 4.52148C34.709 4.32682 34.1377 4.22949 33.5283 4.22949V0.0146484C35.458 0.0146484 37.1126 0.251628 38.4922 0.725586C39.8802 1.15723 41.0186 1.83854 41.9072 2.76953C42.7451 3.6582 43.3757 4.75846 43.7988 6.07031ZM55.7705 21.2539C54.3486 21.2539 53.0156 21.0635 51.7715 20.6826C50.5951 20.3018 49.571 19.7855 48.6992 19.1338C47.8867 18.4736 47.1758 17.6823 46.5664 16.7598C46.0078 15.8796 45.5846 14.9189 45.2969 13.8779C45.0345 12.8623 44.9033 11.7874 44.9033 10.6533C44.9033 8.8929 45.1107 7.36523 45.5254 6.07031C45.9062 4.79232 46.541 3.68359 47.4297 2.74414C48.2591 1.86393 49.3848 1.18262 50.8066 0.700195C52.2454 0.243164 53.917 0.0146484 55.8213 0.0146484V4.22949L55.7959 4.25488C55.1781 4.25488 54.5983 4.35221 54.0566 4.54688C53.515 4.74154 53.1003 4.99121 52.8125 5.2959C52.474 5.67676 52.2116 6.03223 52.0254 6.3623C51.8053 6.7347 51.6403 7.1748 51.5303 7.68262C51.471 7.97884 51.4245 8.24544 51.3906 8.48242C51.3568 8.7194 51.3356 8.93099 51.3271 9.11719C51.2933 9.39648 51.2764 9.90007 51.2764 10.6279C51.2764 11.3304 51.3102 11.944 51.3779 12.4688C51.4456 12.9342 51.5853 13.5055 51.7969 14.1826C52 14.792 52.2666 15.2871 52.5967 15.668C52.9268 16.0996 53.3542 16.4297 53.8789 16.6582C54.4121 16.9206 55.0426 17.0518 55.7705 17.0518V21.2539ZM67.0566 6.07031C67.4714 7.36523 67.6787 8.8929 67.6787 10.6533C67.6787 11.8128 67.5391 12.8962 67.2598 13.9033C67.0143 14.9105 66.5996 15.8711 66.0156 16.7852C65.457 17.64 64.7461 18.4229 63.8828 19.1338C63.0111 19.7855 61.987 20.3018 60.8105 20.6826C59.5326 21.0635 58.1995 21.2539 56.8115 21.2539V17.0518C57.5309 17.0518 58.1572 16.9206 58.6904 16.6582C59.2406 16.4128 59.6722 16.0827 59.9854 15.668C60.3408 15.2025 60.599 14.7074 60.7598 14.1826C60.9883 13.5479 61.1279 12.9766 61.1787 12.4688C61.2633 11.8509 61.3057 11.2373 61.3057 10.6279C61.3057 10.4163 61.3014 10.1878 61.293 9.94238C61.2845 9.68848 61.2718 9.41341 61.2549 9.11719C61.2126 8.77865 61.1745 8.49089 61.1406 8.25391C61.1068 8.00846 61.0771 7.81803 61.0518 7.68262C60.9671 7.22559 60.8021 6.78548 60.5566 6.3623C60.3281 5.93913 60.0615 5.58366 59.7568 5.2959C59.4268 4.94043 59.0078 4.68229 58.5 4.52148C57.9668 4.32682 57.3955 4.22949 56.7861 4.22949V0.0146484C58.7158 0.0146484 60.3704 0.251628 61.75 0.725586C63.138 1.15723 64.2764 1.83854 65.165 2.76953C66.0029 3.6582 66.6335 4.75846 67.0566 6.07031ZM80.1201 21H69.5703V16.5312H71.6016V5.27051H69.5703V0.801758H79.7139V5.27051H78.1016V9.86621L81.4531 5.27051V0.801758H89.3623V5.27051H87.6104L83.5859 10.1582V10.3359C84.957 10.3359 86.0319 10.5729 86.8105 11.0469C87.5892 11.5124 87.9785 12.3249 87.9785 13.4844V15.541C87.9785 15.8034 88.0505 16.0361 88.1943 16.2393C88.3467 16.4339 88.554 16.5312 88.8164 16.5312H90.2637V21H85.6172C82.7734 21 81.3516 19.7008 81.3516 17.1025V14.8936C81.3516 14.4619 81.2119 14.0387 80.9326 13.624C80.6533 13.2008 80.3232 12.9893 79.9424 12.9893H78.1016V16.5312H80.1201V21Z" fill="black"/>
                    </svg>
                </Link>
            </div>
            <Avatar className={styles.avatar}/>
        </div>
    );
}