import styles from './LayoutCenterOnePerson.module.scss';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { LayoutCenterOnePersonProps } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterOnePerson/types/typesLayoutCenterOnePerson';

export function LayoutCenterOnePerson(
    {
        id,
        children,
        isOpenModal,
        onListSelectedUsers
    }: LayoutCenterOnePersonProps
){

    useEffect(() => {

        if (!isOpenModal) return;

        const onKeyDown = (event: KeyboardEvent) => {

            if (event.key === 'Escape') {
                onListSelectedUsers((prev) => prev.filter((person) => person.id !== id));
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpenModal, onListSelectedUsers]);

    return createPortal (

        <div
            className={`
                ${styles['modal']}
                ${isOpenModal && styles['modal--open']}
            `}
            onClick={() => onListSelectedUsers((prev) => prev.filter((person) => person.id !== id))}
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