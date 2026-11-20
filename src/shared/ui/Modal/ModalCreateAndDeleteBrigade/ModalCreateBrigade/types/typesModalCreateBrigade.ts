import type { Dispatch, SetStateAction } from "react";

export interface ModalCreateBrigadeProps {

    onApply:  Dispatch<SetStateAction<{
        cycleStartDate: string;
        numberBrigade: number;
    } | null>>

    isLoadingCreateNewBrigade: boolean;
}