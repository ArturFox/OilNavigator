import type { Dispatch, SetStateAction } from "react";

export interface SelectButtonPersonProps{
    id: string;
    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>;
}