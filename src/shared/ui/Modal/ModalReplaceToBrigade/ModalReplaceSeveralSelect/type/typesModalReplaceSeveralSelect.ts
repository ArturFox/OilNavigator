import type { Dispatch, SetStateAction } from "react";

export interface ModalReplaceSeveralSelectProps {

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    arrSelectButton: {
        id: string;
        name: string;
        surname: string;
    }[];
    setAplly: Dispatch<SetStateAction<string | null>>
}