import { useState } from 'react';
import styles from './ModalReplaceOnlyOneSelect.module.scss';
import { ArrowRight } from 'lucide-react';
import type { ModalReplaceOnlyOneProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/types/typesModalReplaceOnlyOneSelect';

export function ModalReplaceOnlyOne (
    {
        id,
        name,
        surname,

        brigadesId,
        brigadesNumber,

        onApply

    }: ModalReplaceOnlyOneProps
) {

    const [brigadeSelected, onBrigadeSelected] = useState<number | null>(null);

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
                            {brigadeSelected}
                        </span>

                        : <>

                            <span>
                                Выберите
                            </span> 

                            <span>
                                бригаду
                            </span>

                        </>

                    }

                </div>

            </div>

            <div
                className={styles['overlay__brigades']}
            >

                {brigadesNumber.map((brigade) => (

                    <button
                        className={`
                            ${styles['overlay__brigades-button']}
                            ${brigadeSelected === brigade
                                ? styles['overlay__brigades-button--active']
                                : ''}
                        `}
                        onClick={() => {
                            onBrigadeSelected((prev) =>
                                prev === brigade ? null : brigade
                            );
                        }}
                    >

                        {brigade}

                    </button>

                ))}

            </div>

            <button
                className={styles['overlay__apply']}
                disabled={brigadeSelected === null}
                onClick={() => {
                    if (brigadeSelected === null) return;

                    const brigadeIndex: number = brigadesNumber.indexOf(brigadeSelected);
                    if (brigadeIndex === -1) return;

                    onApply({
                        personId: id,
                        brigadeId: brigadesId[brigadeIndex],
                    });
                }}
            >
                Применить
            </button>
        
        </>

    );
}