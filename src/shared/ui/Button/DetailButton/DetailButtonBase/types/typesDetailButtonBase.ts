import type { SetStateAction } from "react";

export interface DetailButtonBaseProps {
    onModalCenter: (value: SetStateAction<boolean>) => void;
    modalCenter: boolean;
}