import { useEffect, useState } from "react";
import styles from './RightCard.module.scss';
import type { PersonsWithStatus } from "../../../../../entities/persons/types/persons.dto";
import type { SelectedPerson } from "../../../types/typeReplaseWorker";

interface Props {
    selectedPerson: SelectedPerson;
    ap: (selectedHuman: PersonsWithStatus) => Promise<void>;
}

export function RightCard (
    {
        selectedPerson,
        ap
    }: Props
) {

    const [currentIndex, onCurrentIndex] = useState<number>(0);

    let arrProblemSelectedPerson: string[] = [];

    if(selectedPerson.personObj) {
        arrProblemSelectedPerson = [
            ...selectedPerson.personObj.redAlarm,
            ...selectedPerson.personObj.yellowAlarm
        ]
    }

    let problemsMoreThatOne: boolean = false;

     if(arrProblemSelectedPerson.length > 1){
        problemsMoreThatOne = true;
    }

    useEffect(() => {

        if(arrProblemSelectedPerson.length <= 1) {
            return
        }

        const interval = setInterval(() => {

            onCurrentIndex((prev) => (prev + 1) % arrProblemSelectedPerson.length)

        }, 2000)

        return () => clearInterval(interval);

    }, [arrProblemSelectedPerson.length])

    return (

        <article
            className={`
                ${styles["rightCard"]}

                ${selectedPerson.personObj && styles["rightCard--selected"]}
                
            `}
        >
            {selectedPerson.personObj

                ?   
                <>
                    <h3
                        className={styles["rightCard__blockBrigadeName"]}
                    >

                        <span>

                            Бригада {selectedPerson.brigade?.number_brigade}

                        </span>

                    </h3>

                    <div
                        className={styles["rightCard__blockPersonInfo"]}
                    >

                        <span
                            className={styles["rightCard__surnameName"]}
                        >

                            {selectedPerson.personObj?.surname} {selectedPerson.personObj?.name}

                        </span>

                        <span
                            className={styles["rightCard__otherSurname"]}
                        >
                            {selectedPerson.personObj?.other_surname}
                        </span>

                    </div>

        
                    <div
                        className={styles["rightCard__blockJob"]}
                    >

                        <span>
                            Должность / блок:
                        </span>

                        <span
                            className={styles["rightCard__jobText"]}
                        >
                            {selectedPerson.personObj?.job_title} / {selectedPerson.personObj?.block}
                        </span>

                    </div>
        

                    <div
                        className={`
                            ${styles["rightCard__blockProblem"]}
                        `}
                    >   
                        <span
                            className={styles["rightCard__titleProblem"]}
                        >
                            {arrProblemSelectedPerson.length > 0 
                                ? 'Проблемы:'
                                : 'Проблем:'
                            }
                        </span>

                        {arrProblemSelectedPerson.length > 0 
                            ? (
                                <span
                                    className={styles["rightCard__textProblem"]}
                                >

                                    {arrProblemSelectedPerson[currentIndex]} {problemsMoreThatOne && `(${arrProblemSelectedPerson.length})`}

                                </span>
                            )
                            : (
                                <span>
                                    Нету
                                </span>
                            )
                            

                        }

                    </div>
                </>

                :   
                <div
                    className={styles["rightCard__dontSelected"]}
                >
                    <span>Выберите</span>
                    <span>сотрудника</span>
                </div>
            }
            <button
                className={`
                    ${styles["rightCard__acceptButton"]}
                    ${selectedPerson !== null && styles["rightCard__acceptButton--selected"]}
                `}
                onClick={() => {
                    if (selectedPerson.personObj) {
                        ap(selectedPerson.personObj)
                    }
                }}
            >
                Применить
            </button>

        </article>
    )
}