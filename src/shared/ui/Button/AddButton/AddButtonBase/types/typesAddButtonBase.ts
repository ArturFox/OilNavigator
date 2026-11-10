import type { Dispatch, SetStateAction } from "react";

export interface AddButtonBaseProps {
    isOpenModal: boolean;
    onIsOpenModal: (isOpenModal: boolean) => void;
    brigadeId: string;
    setTargetBrigadeId: Dispatch<SetStateAction<string | null>>
}