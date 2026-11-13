import type { ModalDeleteBrigadeProps } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalDeleteBrigade/types/typesModalDeleteBrigade';
import styles from './ModalDeleteBrigade.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ModalDeleteBrigade (
    {
        brigadesIdAndNumbers,
        onApply,
        isLoadingDelete
    }: ModalDeleteBrigadeProps
) {

    const [brigadeSelected, onBrigadeSelected] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {

        if(!showToast){
            return
        }

        if(showToast){
            toast.error('Необходимо выбрать бригаду');

            setShowToast(false);
        }

    }, [showToast])

    return (

        <>
            <h4
                className={styles["title"]}
            >
                Удаление бригады
            </h4>

            <div
                className={styles['listBrigades']}
            >

                {brigadesIdAndNumbers.map((brigade) => (

                    <button
                        key={brigade.brigadeId}
                        className={`
                            ${styles['listBrigades-button']}
                            ${brigadeSelected === brigade.brigadeId
                                ? styles['listBrigades-button--active']
                                : ''}
                        `}
                        onClick={() => {
                            onBrigadeSelected((prev) =>
                                prev === brigade.brigadeId 
                                ? null 
                                : brigade.brigadeId
                            );
                        }}
                    >
                        {brigade.brigadeNumber}
                    </button>

                ))}

            </div>

            <button
                className={`
                    ${styles['apply']}
                    ${brigadeSelected && styles['apply--active']}
                `}
                disabled={isLoadingDelete}
                onClick={() => {

                    if (isLoadingDelete) return;

                    if (!brigadeSelected) {
                        setShowToast(true);
                        return;
                    }

                    onApply(
                        brigadeSelected,
                    );
                }}
            >
                {isLoadingDelete ? 'Удаление...' : 'Применить'}
            </button>

        </>
    )
}