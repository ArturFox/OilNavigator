import type { Dispatch, SetStateAction } from "react";

type ModalReplaceSeveralSelectPersonObj = {
    id: string;
    name: string;
    surname: string;
}

export interface ModalReplaceSeveralSelectProps {
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];
    arrSelectButton: ModalReplaceSeveralSelectPersonObj[];
    setIsApllyModalSeveral: Dispatch<SetStateAction<string | null>>
}