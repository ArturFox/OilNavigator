import { useState } from 'react';
import styles from './ModalReplaceOnlyOneSelect.module.scss';
import { ArrowRight } from 'lucide-react';
import type { ModalReplaceOnlyOneProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/types/typesModalReplaceOnlyOneSelect';

export function ModalReplaceOnlyOne (
    {
        id,
        name,
        surname,

        brigadesIdAndNumbers,
        
        onApply

    }: ModalReplaceOnlyOneProps
) {

    const [brigadeSelected, onBrigadeSelected] = useState<string | null>(null);

    return (

        <>

            <h4
                className={styles['overlay__title']}
            >
                Выберите бригаду 
            </h4>

            <div
                className={styles['overlay__block']}
            >

                <div
                    className={styles['overlay__block-nameInfo']}
                >
                    <span>{surname}</span>
                    <span>{name}</span>
                </div>

                <div
                    className={styles['overlay__block-iconeRight']}
                >
                    <ArrowRight/>
                </div>

                <div
                    className={`
                        ${styles['overlay__block-selectedBrigade']}
                        ${brigadeSelected && styles['overlay__block-selectedBrigade--active']}
                    `}
                >
                    {brigadeSelected

                        ? <span>
                            {brigadesIdAndNumbers.find(
                                (brigade) => brigade.brigadeId === brigadeSelected
                            )?.brigadeNumber}
                        </span>

                        : <>
                            <span>Выберите</span>
                            <span>бригаду</span>
                        </>
                    }

                </div>

            </div>

            <div
                className={styles['overlay__brigades']}
            >

                {brigadesIdAndNumbers.map((brigade) => (

                    <button
                        key={brigade.brigadeId}
                        className={`
                            ${styles['overlay__brigades-button']}
                            ${brigadeSelected === brigade.brigadeId
                                ? styles['overlay__brigades-button--active']
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
                className={styles['overlay__apply']}
                disabled={brigadeSelected === null}
                onClick={() => {
                    if (brigadeSelected === null) return;

                    onApply({
                        personId: id,
                        brigadeId: brigadeSelected,
                    });
                }}
            >
                Применить
            </button>
        
        </>

    );
}