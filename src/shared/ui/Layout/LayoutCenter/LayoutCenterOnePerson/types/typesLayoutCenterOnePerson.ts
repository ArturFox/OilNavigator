import type { Dispatch, ReactNode, SetStateAction } from "react";

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export interface LayoutCenterOnePersonProps {
    id: string;
    children: ReactNode;
    isOpenModal: boolean;
    onListSelectedUsers: Dispatch<SetStateAction<PersonObj[]>>;
}