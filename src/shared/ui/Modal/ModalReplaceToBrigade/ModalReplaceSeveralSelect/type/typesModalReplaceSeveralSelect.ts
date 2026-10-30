import type { Dispatch, SetStateAction } from "react";

type ModalReplaceSeveralSelectPersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export interface ModalReplaceSeveralSelectProps {

    brigadesId: string[];
    brigadesNumber: number[];

    arrSelectButton: ModalReplaceSeveralSelectPersonObj[];
    onArrSelectButton: Dispatch<SetStateAction<ModalReplaceSeveralSelectPersonObj[]>>;
}