import { useEffect, useState } from 'react';
import styles from './LeftCard.module.scss';
import type { PersonsWithStatus } from '../../../../../entities/persons/types/persons.dto';
import type { SelectedPerson } from '../../../types/typeReplaseWorker';

interface Props {
    selectedPerson: SelectedPerson;
    personToReplace: PersonsWithStatus | null;
    arrProblemPersonToReplace: string[];
    modalCenter: boolean;
    onModalCenter: (modalCenter: boolean) => void;
}

export function LeftCard (
    {
        selectedPerson,
        personToReplace,
        arrProblemPersonToReplace,
        modalCenter,
        onModalCenter
    }: Props
) {
    const [currentIndex, onCurrentIndex] = useState<number>(0);

    let problemsMoreThatOne: boolean = false;

    if (arrProblemPersonToReplace.length > 1) {
        problemsMoreThatOne = true;
    }

    useEffect(() => {
        if (arrProblemPersonToReplace.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            onCurrentIndex((prev) => (prev + 1) % arrProblemPersonToReplace.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [arrProblemPersonToReplace.length]);
    
    return (
        <>
            {personToReplace 
                ? (
                    <article
                        className={`
                            ${styles["leftCard"]}

                            ${(selectedPerson.brigade && selectedPerson.personObj) 
                                && styles["leftCard--selected"]
                            }

                            ${personToReplace.redAlarm.length > 0 &&
                            personToReplace.yellowAlarm.length > 0 
                                ? styles["leftCard--mix"]
                                : personToReplace.redAlarm.length > 0 
                                    ? styles["leftCard--redAlarm"]
                                    : personToReplace.yellowAlarm.length > 0
                                        ? styles["leftCard--yellowAlarm"]
                                        : styles["leftCard--greenAlarm"]
                            }    
                        `}
                    >
                        <h3 className={styles["leftCard__blockBrigadeName"]}>
                            <span>
                                Бригада {personToReplace.brigade_name?.number_brigade}
                            </span>
                        </h3>

                        <div className={styles["leftCard__blockPersonInfo"]}>
                            <span>
                                {personToReplace.surname} {personToReplace.name}
                            </span>
                            <span>
                                {personToReplace.other_surname}
                            </span>
                        </div>
                
                        <div className={styles["leftCard__blockJob"]}>
                            <span>
                                Должность / блок:
                            </span>
                            <span className={styles["leftCard__jobText"]}>
                                {personToReplace.job_title} / {personToReplace.block}
                            </span>
                        </div>
                    
                        <div className={`${styles["leftCard__blockProblem"]}`}>   
                            <span className={styles["leftCard__titleProblem"]}>
                                {arrProblemPersonToReplace.length > 0 
                                    ? 'Проблемы:'
                                    : 'Проблем:'
                                }
                            </span>

                            {arrProblemPersonToReplace.length > 0 
                                ? (
                                    <span className={styles["leftCard__textProblem"]}>
                                        {arrProblemPersonToReplace[currentIndex]} {problemsMoreThatOne && `(${arrProblemPersonToReplace.length})`}
                                    </span>
                                )
                                : (
                                    <span>
                                        Нету
                                    </span>
                                )
                            }
                        </div>

                        <button
                            className={`${styles["leftCard__acceptButton"]}`}
                            onClick={() => onModalCenter(!modalCenter)}
                        >
                            Подробнее
                        </button>
                    </article>
                ) 
            
                : (
                    <article
                        className={`
                            ${styles["leftCard"]}
                            ${styles["leftCard--notHuman"]}
                            ${(selectedPerson.brigade && selectedPerson.personObj) 
                                && styles["leftCard--selected"]
                            }
                        `}
                    >

                        <div
                            className={styles["leftCard__dontSelected"]}
                        >
                            <span>Человек</span>
                            <span>отсутствует</span>
                        </div>
                        
                    </article>
                    
                )

            }

        </>

    );

}
