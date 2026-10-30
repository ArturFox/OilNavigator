import type { Dispatch, SetStateAction } from "react";

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export interface SelectButtonBaseProps{
    id: string;
    name: string;
    surname: string;
    isOpenModal: boolean;
    onListSelectedUsers: Dispatch<SetStateAction<PersonObj[]>>;
}