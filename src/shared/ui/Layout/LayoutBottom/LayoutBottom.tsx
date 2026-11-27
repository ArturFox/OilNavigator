import styles from './LayoutBottom.module.scss';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { LayoutBottomProps } from '@/shared/ui/Layout/LayoutBottom/types/typesLayoutBottom';

export function LayoutBottom(
    {
        children,
        isOpenModal,
        onIsOpenModal
    }: LayoutBottomProps
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
                ${styles['layout']}
                ${isOpenModal && styles['layout--open']}
            `}
            onClick={() => onIsOpenModal(false)}
        >
            
            {children}

        </div>,

        document.body

    );

}