import type { ReactNode } from "react";

export interface LayoutCenterOnePersonProps {
    children: ReactNode;
    isOpenModal: boolean;
    onIsOpenModal: (isOpenModal: boolean) => void;
}