import type { ReactNode } from "react";

export interface LayoutBottomProps {
    children: ReactNode;
    isOpenModal: boolean;
    onIsOpenModal: (isOpenModal: boolean) => void;
}