import { useState } from 'react';
import styles from './ModalReplaceSeveralSelect.module.scss';
import { ArrowRight } from 'lucide-react';
import type { ModalReplaceSeveralSelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/type/typesModalReplaceSeveralSelect';

export function ModalReplaceSeveralSelect (
    {
        brigadesIdAndNumbers,
        arrSelectButton,
        setIsApllyModalSeveral
    }: ModalReplaceSeveralSelectProps
) {
    const [brigadeSelected, onBrigadeSelected] = useState<string | null>(null);
    const [isLoading, onIsLoading] = useState<boolean>(false);

    return (
        <>
            <h4 
                className={styles['title']}
            >
                Замена бригады
            </h4>

            <div 
                className={styles['replaceMainBlock']}
            >

                {arrSelectButton.map((person) => (

                    <div
                        key={person.id}
                        className={styles['replaceMainBlock-replaceBlock']}
                    >

                        <div className={styles['replaceMainBlock-replaceBlock-info']}>
                            <span>{person.surname}</span>
                            <span>{person.name}</span>
                        </div>

                        <div className={styles['replaceMainBlock-replaceBlock-icone']}>
                            <ArrowRight />
                        </div>

                        <div
                            className={`
                                ${styles['replaceMainBlock-replaceBlock-selectedBrigade']}
                                ${brigadeSelected !== null
                                    ? styles['replaceMainBlock-replaceBlock-selectedBrigade--active']
                                    : ''}
                            `}
                        >
                            {brigadeSelected !== null
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

                ))}

            </div>

            <div className={styles['listBrigades']}>

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
                                prev === brigade.brigadeId ? null : brigade.brigadeId
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
                onClick={() => {
                    if(!brigadeSelected){
                        return
                    }
                    setIsApllyModalSeveral({
                        idBrigadeSelected: brigadeSelected,
                    })
                }}
                disabled={isLoading || !brigadeSelected}
            >
                {!brigadeSelected 
                    ? 'Выберите бригаду'
                    : !isLoading 
                        ? 'Применить' 
                        : 'Применение...'
                }
            </button>
        </>
    );
}