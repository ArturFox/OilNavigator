import styles from './LayoutCenterColumn.module.scss';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { LayoutCenterOnePersonProps } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterColumn/types/typesLayoutCenterColumn';

export function LayoutCenterColumn(
    {
        children,
        isOpenModal,
        onIsOpenModal
    }: LayoutCenterOnePersonProps
){

    useEffect(() => {

        if (!isOpenModal) return;

        const onKeyDown = (event: KeyboardEvent) => {

            if (event.key === 'Escape') {
                onIsOpenModal(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };

    }, [isOpenModal, onIsOpenModal]);

    useEffect(() => {

        if (isOpenModal) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
        
    }, [isOpenModal])

    return createPortal (

        <div
            className={`
                ${styles['modal']}
                ${isOpenModal && styles['modal--open']}
            `}
            onClick={() => onIsOpenModal(false)}
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