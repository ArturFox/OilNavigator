import { useEffect } from "react";
import styles from './LayoutCenterBase.module.scss';
import { createPortal } from "react-dom";
import type { LayoutCenterBaseProps } from "@/shared/ui/Layout/LayoutCenter/LayoutCenterBase/types/typesLayoutCenterBase";

export function LayoutCenterBase(
    {
        children,
        openModalSeveral,
        onOpenModalSeveral,
    }: LayoutCenterBaseProps
) {

    useEffect(() => {
        if (!openModalSeveral) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenModalSeveral(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [openModalSeveral, onOpenModalSeveral]);

    return createPortal(

        <div
            className={`
                ${styles['modal']}
                ${openModalSeveral && styles['modal--open']}
            `}
            onClick={() => onOpenModalSeveral(false)}
        >
            
            <div
                className={styles['modal__mainBlock']}
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>

        </div>,

        document.body
    );
}