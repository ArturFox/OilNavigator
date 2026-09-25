import { ArrowRightLeft, Plus, Search } from 'lucide-react';
import styles from './Person.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import { brigadeSortArrScheduleChange } from '../../model/selectorsScheduleChange';
import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import { ModalCenterWindow } from '../../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import { ModalReplaceToBrigade } from '../../../../shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceToBrigade';

interface Props {
    person: Persons | null
}

export function Person (
    {
        person
    }: Props
) {

    const brigadeSortArr = useSelector(brigadeSortArrScheduleChange) as Brigade[];

    const [modalCenter, onModalCenter] = useState<boolean>(false);
    const [modalReplace, onModalReplace] = useState<boolean>(false);

    return (
        <>
            {person ? (

                <li
                    key={person.id}
                    className={styles['peopleItem']}
                >

                    <span
                        className={styles['peopleItem-name']}
                    >
                        {person.surname} {person.name} {person.other_surname}
                    </span>

                    <span
                        className={styles['peopleItem-info']}
                    >
                        {person.job_title} / {person.block}
                    </span>

                        
                    <button
                        className={styles['peopleItem-buttonArrow']}
                        onClick={() => onModalReplace(!modalReplace)}
                    >
                        <ArrowRightLeft size={18}/>
                    </button>


                    <button
                        className={styles['peopleItem-buttonSearch']}
                        onClick={() => onModalCenter(!modalCenter)}
                    >
                        <Search size={18}/>
                    </button>

                </li>
            )

            : <li
                    className={styles['peopleItem-notPerson']}
                    
                >

                    <span
                        className={styles['peopleItem-notPerson-text']}
                    >
                        Нету Человека
                    </span>

                    
                    <button
                        className={styles['peopleItem-notPerson-buttonArrow']}
                    >
                        <Plus size={18}/>
                    </button>


                </li>
    
            }

            {person && 

                <ModalCenterWindow
                    modalCenter={modalCenter}
                    onModalCenter={onModalCenter}
                    person={person}
                />

            }

            {(person && modalReplace) && 

                <ModalReplaceToBrigade
                    modalReplace={modalReplace}
                    onModalReplace={onModalReplace}
                    person={person}
                    brigadeArr={brigadeSortArr}
                />
            }

        </>
    )
}