import { useState } from 'react';
import styles from './ModalReplaceSeveralSelect.module.scss';
import { ArrowRight } from 'lucide-react';
import type { ModalReplaceSeveralSelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/type/typesModalReplaceSeveralSelect';

export function ModalReplaceSeveralSelect (
    {
        brigadesNumber,

        arrSelectButton,

    }: ModalReplaceSeveralSelectProps
) {

    const [brigadeSelected, onBrigadeSelected] = useState<number | null>(null);

    return (

        <>

            <h4
                className={styles['overlay__title']}
            >
                Выберите бригаду 
            </h4>

        

            <div className={styles['overlay__blocks']}>

                {arrSelectButton.map((person) => (

                    <div
                        className={styles['overlay__block']}
                        key={person.id}
                    >

                        <div className={styles['overlay__block-nameInfo']}>
                            <span>{person.surname}</span>
                            <span>{person.name}</span>
                        </div>

                        <div className={styles['overlay__block-iconeRight']}>
                            <ArrowRight />
                        </div>

                        <div
                            className={`
                                ${styles['overlay__block-selectedBrigade']}
                                ${brigadeSelected !== null
                                    ? styles['overlay__block-selectedBrigade--active']
                                    : ''}
                            `}
                        >
                            {brigadeSelected !== null
                                ? <span>{brigadeSelected}</span>
                                : <>
                                    <span>Выберите</span>
                                    <span>бригаду</span>
                                </>
                            }
                        </div>

                    </div>

                ))}

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
                
            >
                Применить
            </button>

        </>
    )
}