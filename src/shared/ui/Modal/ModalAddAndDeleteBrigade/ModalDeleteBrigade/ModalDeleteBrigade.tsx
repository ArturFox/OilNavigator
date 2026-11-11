import type { ModalDeleteBrigadeProps } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalDeleteBrigade/types/typesModalDeleteBrigade';
import styles from './ModalDeleteBrigade.module.scss';
import { useState } from 'react';

export function ModalDeleteBrigade (
    {
        brigadesIdAndNumbers,
        onApply
    }: ModalDeleteBrigadeProps
) {

    const [brigadeSelected, onBrigadeSelected] = useState<string | null>(null);

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
                className={styles['apply']}
                disabled={brigadeSelected === null}
                onClick={() => {
                    if (brigadeSelected === null) return;

                    onApply({
                        brigadeId: brigadeSelected,
                    });
                }}
            >
                Применить
            </button>

        </>
    )
}