import type { ReactNode } from "react";

export interface LayoutCenterBaseProps {
    children: ReactNode;
    openModalSeveral: boolean;
    onOpenModalSeveral: (value: boolean) => void;
}