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
                className={styles['title']}
            >
                Выберите бригаду 
            </h4>

            <div
                className={styles['replaceBlock']}
            >

                <div
                    className={styles['replaceBlock-info']}
                >
                    <span>{surname}</span>
                    <span>{name}</span>
                </div>

                <div
                    className={styles['replaceBlock-icone']}
                >
                    <ArrowRight/>
                </div>

                <div
                    className={`
                        ${styles['replaceBlock-selectedBrigade']}
                        ${brigadeSelected && styles['replaceBlock-selectedBrigade--active']}
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