import styles from './ReplaceWorkerProcess.module.scss';
import type { Persons, PersonsWithStatus } from '../../entities/persons/types/persons.dto';
import type { BrigadesDto } from '../../entities/brigades/types/brigades.dto';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';

interface Props {
    selectedPerson: Persons | null;
    person: PersonsWithStatus;
    arrProblem: string[];
    brigadeName: BrigadesDto;
    shift: SortShift;
}

export function ReplaceWorkerProcess ({selectedPerson, person, arrProblem, brigadeName, shift}:Props) {


    return(

        <section
            className={`
                ${styles["replaceWorkerProcess"]}
                 
            `}

        >

            <article
                className={`
                    ${styles["replaceWorkerProcess__leftPerson"]}
                    ${selectedPerson !== null && styles["replaceWorkerProcess__leftPerson--selected"]}
                    ${arrProblem.length > 0 
                        ? styles["replaceWorkerProcess__leftPerson--red"]
                        : styles["replaceWorkerProcess__leftPerson--green"]
                    }    
                `}
            >
                <h3
                    className={styles["replaceWorkerProcess__leftPerson__brigadeName"]}
                >
                    {brigadeName.name}
                </h3>

                <div
                    className={styles["replaceWorkerProcess__leftPerson__blockPersonInfo"]}
                >

                    <div
                        className={styles["replaceWorkerProcess__leftPerson__blockSurnameName"]}
                    >

                        <span>{person.surname}</span>
                        <span>{person.name}</span>

                    </div>

                    <span>
                        {person.other_surname}
                    </span>

                </div>

                
                <span
                    className={styles["replaceWorkerProcess__leftPerson__jobTitleBlock"]}
                >
                    {person.job_title} / {person.block}
                </span>
                

                <div
                    className={`
                        ${styles["replaceWorkerProcess__leftPerson__problem"]}
                    `}
                >   
                    <span
                        className={styles["replaceWorkerProcess__leftPerson__titleProblem"]}
                    >
                        Проблемы:
                    </span>

                    {arrProblem.length > 0 
                        ? (
                            arrProblem.map((problem, index) => (
                                <span key={index}>
                                    {problem}
                                </span>
                            ))
                        ) : (
                            <span>нету</span>
                        )
                    }

                </div>

                <button
                    className={`
                        ${styles["replaceWorkerProcess__leftPerson__acceptButton"]}
                    `}
                >
                    Подробнее
                </button>

            </article>

            <article
                className={`
                    ${styles["replaceWorkerProcess__rightPerson"]}
                    ${selectedPerson !== null && styles["replaceWorkerProcess__rightPerson--selected"]}
                `}
            >
                {selectedPerson 
                    ?   <>
                            <h3
                                className={styles["replaceWorkerProcess__rightPerson__brigadeName"]}
                            >
                                Бригада {selectedPerson.brigade_name}
                            </h3>

                            <div
                                className={styles["replaceWorkerProcess__rightPerson__blockPersonInfo"]}
                            >

                                <div
                                    className={styles["replaceWorkerProcess__rightPerson__blockSurnameName"]}
                                >

                                    <span>{selectedPerson.surname}</span>
                                    <span>{selectedPerson.name}</span>

                                </div>

                                <span
                                    className={styles["replaceWorkerProcess__rightPerson__otherSurname"]}
                                >
                                    {selectedPerson.other_surname}
                                </span>

                            </div>

                
                            <span
                                className={styles["replaceWorkerProcess__rightPerson__jobTitleBlock"]}
                            >
                                {selectedPerson.job_title} / {selectedPerson.block}
                            </span>
                

                            <div
                                className={`
                                    ${styles["replaceWorkerProcess__rightPerson__problem"]}
                                `}
                            >   
                                <span
                                    className={styles["replaceWorkerProcess__rightPerson__titleProblem"]}
                                >
                                    Проблемы:
                                </span>

                                {arrProblem.length > 0 
                                    ? (
                                        arrProblem.map((problem, index) => (
                                            <span key={index}>
                                                {problem}
                                            </span>
                                        ))
                                    ) : (
                                        <span>нету</span>
                                    )
                                }

                            </div>
                        </>
                    :   <div
                            className={styles["replaceWorkerProcess__rightPerson__dontSelected"]}
                        >
                            <span>Выберите</span>
                            <span>сотрудника</span>
                        </div>
                }
                <button
                    className={`
                        ${styles["replaceWorkerProcess__acceptButton"]}
                        ${selectedPerson !== null && styles["replaceWorkerProcess__acceptButton--selected"]}
                    `}
                >
                    Применить
                </button>

            </article>

        </section>
    )
}