import type { Dispatch, SetStateAction } from "react";

export interface ModalAddBrigadeProps {
    installation_id: string;
    onApply:  Dispatch<SetStateAction<{
        cycle_start_date: string;
        installation_id: string;
        number_brigade: number;
    } | null>>
}