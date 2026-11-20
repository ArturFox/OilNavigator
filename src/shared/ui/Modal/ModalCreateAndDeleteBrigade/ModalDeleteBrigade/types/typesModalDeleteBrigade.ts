import type { Dispatch, SetStateAction } from "react";

export interface ModalDeleteBrigadeProps {
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    isLoadingDelete: boolean;

    onApply: Dispatch<SetStateAction<string | null>>;
}