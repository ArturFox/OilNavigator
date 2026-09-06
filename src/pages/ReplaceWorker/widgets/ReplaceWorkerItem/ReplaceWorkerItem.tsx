import type { PersonsWithStatus } from '../../../../entities/persons/types/persons.dto';
import { ModalCenterWindow } from '../../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import styles from './ReplaceWorkerItem.module.scss';
import { useEffect, useState } from 'react';

interface Props {
    person: PersonsWithStatus;
    selected: string;
    onSelected: (value: string) => void;
    onSelectedPerson: (value: PersonsWithStatus | null) => void;
    personToReplace: PersonsWithStatus | undefined;
}

export function ReplaceWorkerItem (
    {
        person, 
        selected, 
        onSelected, 
        onSelectedPerson,
        personToReplace
    }: Props
) {

    const selectedBoolean: boolean = person.id === selected;

    const arrProblem = [
        ...person.yellowAlarm,
        ...person.redAlarm
    ];

    let problemsMoreThatOne: boolean = false;

     if(arrProblem.length > 1){
        problemsMoreThatOne = true;
    }

    const [modalCenter, onModalCenter] = useState<boolean>(false);
    const [currentIndex, onCurrentIndex] = useState<number>(0);

    useEffect(() => {

        if(arrProblem.length <= 1) {
            return
        }

        const interval = setInterval(() => {

            onCurrentIndex((prev) => (prev + 1) % arrProblem.length)

        }, 2000)

        return () => clearInterval(interval);

    }, [arrProblem.length])

    return(

        <li
            className={`
                ${styles["replaceWorkerItem"]}    
                ${person.redAlarm.length > 0 && styles["replaceWorkerItem--redAlarm"]}
            `}
        >

            <div
                className={styles["replaceWorkerItem__info"]}
            >
                <span
                    className={styles["replaceWorkerItem__info-name"]}
                >
                    {person.surname} {person.name} {person.other_surname}
                </span>

            </div>
            

            <div
                className={styles["replaceWorkerItem__status"]}
            >

                <div
                    className={styles["replaceWorkerItem__status1"]}
                >

                    <span
                        className={styles["replaceWorkerItem__jobTitle"]}
                    >
                        {person.job_title} / {person.block}
                    </span>

                    <div
                        className={styles["replaceWorkerItem__problem"]}
                    >
                        {arrProblem.length > 0 

                            ?   <>
                                    
                                    <span
                                        
                                    >
                                        {arrProblem[currentIndex]} {problemsMoreThatOne && `(${arrProblem.length})`}
                                    </span>
                                    
                                </>
                            : <>

                                <span>
                                    Проблем не обноружены
                                </span>
                                
                            </>

                        }
                    </div>

                </div>

                <div
                    className={styles["replaceWorkerItem__status2"]}
                >
                    <span
                        className={styles["replaceWorkerItem__heCanTitle"]}
                    >
                        Доп. блоки:
                    </span>

                    <div
                        className={styles["replaceWorkerItem__heCanBlock"]}
                    >
                        {person.he_can?.map((block, index) => {

                            let blockSame: boolean;

                            if(personToReplace &&
                                personToReplace.he_can &&
                                personToReplace.he_can?.length > 0
                            ) {
                                let shortPersonToReplace = personToReplace.block.toLowerCase();
                                let shortPerson = block.toLowerCase();
                                blockSame = shortPersonToReplace === shortPerson;
                            } else {
                                blockSame = false;
                            }

                            return(

                                <span
                                    className={`
                                        ${styles["replaceWorkerItem__heCan"]}
                                        ${blockSame && styles["replaceWorkerItem__heCan--good"]}    
                                    `}
                                >

                                    {block}
                                    
                                </span>

                            )
                        })}
                    </div>
                </div>

            </div>

            <div
                className={styles["replaceWorkerItem__buttonSelect"]}
            >
                <button
                    className={`
                        ${styles['replaceWorkerItem__buttonPress']}
                        ${selectedBoolean && styles["replaceWorkerItem__buttonPress--selected"]}
                    `}
                    onClick={() => {

                        if(selected === person.id){
                            onSelected('')
                            onSelectedPerson(null)
                        }else {
                            onSelected(person.id)
                            onSelectedPerson(person)
                        }
                        
                    }}
                >
                    {selectedBoolean 
                        ? 'Выбран'
                        : 'Выбрать'
                    }
                </button>
                
            </div>

            <div
                className={styles["replaceWorkerItem__buttonMore"]}
            >
                <button
                    className={styles["replaceWorkerItem__button2"]}
                    onClick={() => onModalCenter(!modalCenter)}
                >
                    Подробнее
                </button>
                
            </div>

            <ModalCenterWindow
                modalCenter={modalCenter}
                onModalCenter={onModalCenter}
                person={person}
                arrProblem={arrProblem}
                personToReplace = {personToReplace}
            />

        </li>
    )
}