import React from 'react';
import {USER_AVATAR_SIZE} from '../../enums';

type Props = {
    src: string,
    size: USER_AVATAR_SIZE
};

export const UserAvatar: React.FC<Props> = ({src, size}): React.ReactElement | null => {
    return (
        <img src={src} width={size} height={size}/>
    );
};