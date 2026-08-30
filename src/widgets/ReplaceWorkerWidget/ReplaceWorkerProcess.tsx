import styles from './ReplaceWorkerProcess.module.scss';
import type { Persons, PersonsWithStatus } from '../../entities/persons/types/persons.dto';
import type { BrigadesDto } from '../../entities/brigades/types/brigades.dto';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';
import { ModalCenterWindow } from '../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import { useState } from 'react';

interface Props {
    selectedPerson: Persons | null;
    person: PersonsWithStatus;
    arrProblem: string[];
    brigadeName: BrigadesDto;
    shift: SortShift;
}

export function ReplaceWorkerProcess (
    {
        selectedPerson, 
        person, 
        arrProblem, 
        brigadeName, 
        shift,
    }:Props
) {

    const [modalCenter, onModalCenter] = useState<boolean>(false);

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

                    <span
                        className={styles["replaceWorkerProcess__leftPerson__surnameName"]}
                    >

                        {person.surname} {person.name}

                    </span>

                    <span>
                        {person.other_surname}
                    </span>

                </div>

                
                <span
                    className={styles["replaceWorkerProcess__leftPerson__blockJobTitle"]}
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
                    onClick={() => onModalCenter(!modalCenter)}
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

                                <span
                                    className={styles["replaceWorkerProcess__rightPerson__surnameName"]}
                                >

                                    {selectedPerson.surname} {selectedPerson.name}

                                </span>

                                <span
                                    className={styles["replaceWorkerProcess__rightPerson__otherSurname"]}
                                >
                                    {selectedPerson.other_surname}
                                </span>

                            </div>

                
                            <div
                                className={styles["replaceWorkerProcess__rightPerson__blockJobTitle"]}
                            >
                                
                                <span
                                    className={styles["replaceWorkerProcess__rightPerson__blockJobTitleText"]}
                                >
                                    {selectedPerson.job_title} / {selectedPerson.block}
                                </span>

                            </div>
                

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
                                        <span>
                                            нету
                                        </span>
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

            <ModalCenterWindow
                modalCenter={modalCenter}
                onModalCenter={onModalCenter}
                person={person}
                arrProblem={arrProblem}
            />

        </section>
    )
}