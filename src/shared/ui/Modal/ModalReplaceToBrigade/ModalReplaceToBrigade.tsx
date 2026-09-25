import { useState } from 'react';
import styles from './ModalReplaceToBrigade.module.scss';
import { createPortal } from 'react-dom'; 
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import { ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { onBrigadeTransfer, type AppDispatch } from '../../../../app/store/store';
import { toast } from 'sonner';

interface Props {
    modalReplace: boolean;
    onModalReplace: (modalCenter: boolean) => void;
    person: Persons,
    brigadeArr: Brigade[],
}

export function ModalReplaceToBrigade (
    {
        modalReplace,
        onModalReplace,
        person,
        brigadeArr
    }: Props
) {

    const dispatch = useDispatch<AppDispatch>();

    const [brigadeSelected, onBrigadeSelected] = useState<Brigade | null>(null);

    if (!modalReplace) return null;

    function handleApply(){

        if(!brigadeSelected){
            toast.error("Выберите бригаду")
            return;
        }

        dispatch(onBrigadeTransfer({
            person: person,
            brigade: brigadeSelected
        }))
    }

    return createPortal (

        <div
            className={`
                ${styles["overlay"]}
                ${modalReplace && styles["overlay--open"]} 
            `}
            onClick={() => onModalReplace(!modalReplace)}
        >

            <div
                className={`
                    ${styles['overlay__modal']}
                     
                `}
                onClick={(event) => event?.stopPropagation()}
            >

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
                        <span>{person.surname}</span>
                        <span>{person.name}</span>
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
                                {brigadeSelected.name}
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

                    {brigadeArr.map((brigade) => (

                        <button
                            className={`
                                ${styles['overlay__brigades-button']}
                                ${brigadeSelected?.id === brigade.id && styles['overlay__brigades-button--active']}
                            `}
                            onClick={() => {

                                const activeOrNot: boolean = brigadeSelected?.id === brigade.id;

                                if(activeOrNot){
                                    onBrigadeSelected(null)
                                }else{
                                    onBrigadeSelected(brigade)
                                }
                            }}
                        >

                            {brigade.number_brigade}

                        </button>

                    ))}

                </div>

                <button
                    className={styles['overlay__apply']}
                    onClick={() => {
                        handleApply()
                    }}
                >
                    Применить
                </button>
            </div>

        </div>,

        document.body

    );
}