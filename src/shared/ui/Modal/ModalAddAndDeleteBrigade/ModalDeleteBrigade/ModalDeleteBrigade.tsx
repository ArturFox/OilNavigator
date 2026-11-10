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

        <section
            className={styles["modalDeleteBrigade"]}
        >

            <h4
                className={styles["modalDeleteBrigade__title"]}
            >
                Удаление бригады
            </h4>

            <div
                className={styles["modalDeleteBrigade__bridadesList"]}
            >

                {brigadesIdAndNumbers.map((brigade) => (

                    <button
                        key={brigade.brigadeId}
                        className={`
                            ${styles["modalDeleteBrigade__bridadesList__button"]}
                            ${brigadeSelected === brigade.brigadeId
                                ? styles["modalDeleteBrigade__bridadesList__button--selected"]
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
                className={styles["modalDeleteBrigade__bridadesList"]}
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

        </section>
    )
}