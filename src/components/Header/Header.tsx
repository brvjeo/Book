import {UserAvatar} from '../UserAvatar/UserAvatar';
import {USER_AVATAR_SIZE} from '../../enums';
import avatar from '../../assets/images/image.jpeg';
import styles from './Header.module.scss';

export const Header: React.FC = () : React.ReactElement | null => {
    return (
        <header className={styles.header}>
            <span>Logo</span>
            <UserAvatar src={avatar} size={USER_AVATAR_SIZE.S}/>
        </header>
    );
}