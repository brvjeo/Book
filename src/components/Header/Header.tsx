import {UserAvatar} from '../UserAvatar/UserAvatar';
import {UserAvatarSize} from '../../enums';
import avatar from '../../assets/image.jpeg';
import styles from './Header.module.scss';

export const Header: React.FC = () : React.ReactElement | null => {
    return (
        <header className={styles.header}>
            <span>Logo</span>
            <UserAvatar src={avatar} size={UserAvatarSize.S}/>
        </header>
    );
}