import {IUser} from "../core/application";

export const getShortName = ({name, lastname}: IUser): string => {
    return name.slice(0, 1).toUpperCase() + name.slice(1) + ' ' + lastname[0].toUpperCase() + '.';
}

export const emptyArray = (length: number): number[] => new Array(length).fill(0);