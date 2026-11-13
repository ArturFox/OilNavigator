import type { Dispatch, SetStateAction } from "react";

export interface ModalAddBrigadeProps {
    onApply:  Dispatch<SetStateAction<{
        cycleStartDate: string;
        numberBrigade: number;
    } | null>>
}