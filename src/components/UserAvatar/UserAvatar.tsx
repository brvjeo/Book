import React from 'react';
import {UserAvatarSize} from '../../enums';

type Props = {
    src: string,
    size: UserAvatarSize
};

export const UserAvatar: React.FC<Props> = ({src, size}): React.ReactElement | null => {
    return (
        <img src={src} width={size} height={size}/>
    );
};