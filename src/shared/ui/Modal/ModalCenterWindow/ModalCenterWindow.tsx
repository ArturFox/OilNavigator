import { useEffect } from 'react';
import styles from './ModalCenterWindow.module.scss';
import type { PersonsWithStatus } from '../../../../entities/persons/types/persons.dto';

interface Props {
    modalCenter: boolean;
    onModalCenter: (modalCenter: boolean) => void;
    person: PersonsWithStatus;
    arrProblem?: string[];
    personToReplace?: PersonsWithStatus;
}

export function ModalCenterWindow (
    {
        modalCenter,
        onModalCenter,
        person,
        arrProblem,
        personToReplace
    }: Props
) {

    useEffect(() => {
        
        if(modalCenter === false){
            return;
        }

        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = '';
        };

    }, [modalCenter]);

    return(

        <div
            className={`
                ${styles["modal"]}
                ${modalCenter && styles["modal--open"]} 
            `}
            onClick={() => onModalCenter(!modalCenter)}
        >

            <div
                className={`
                    ${styles['modal__mainBlock']}
                     
                `}
                onClick={(event) => event?.stopPropagation()}
            >

                <h4
                    className={styles['modal__title']}
                >
                    {person.surname} {person.name} {person.other_surname}
                </h4>

                <div
                    className={styles['modal__blockInfo']}
                >
                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Бригада:
                    </h5>
                    <span>
                        {person.brigade_name}
                    </span>
                </div>

                <div
                    className={styles['modal__blockInfo']}
                >
                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Должность:
                    </h5>
                    <span>
                        {person.job_title}
                    </span>
                </div>

                <div
                    className={styles['modal__blockInfo']}
                >
                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Блок:
                    </h5>
                    <span>
                        {person.block}
                    </span>
                </div>

                <div
                    className={styles['modal__blockInfo']}
                >

                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Проблемы:
                    </h5>

                    <div
                        className={styles['modal__blockProblem']}
                    >

                        {arrProblem && arrProblem.length > 0 
                            ? (
                                arrProblem.map((problem, index) => (
                                    <span 
                                        key={index}
                                        className={styles['modal__problem']}
                                    >
                                        {problem}
                                    </span>
                                ))
                            ) : (
                                <span
                                    className={styles['modal__good']}
                                >
                                    нету
                                </span>
                            )
                        }

                    </div>

                </div>

                <div
                    className={styles['modal__blockInfo']}
                >

                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Разряд:
                    </h5>

                    <span>
                        {person.discharge}
                    </span>

                </div>

                <div
                    className={styles['modal__blockInfo']}
                >

                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        День рождения:
                    </h5>

                    <span>
                        {person.birthday
                            ? person.birthday
                            : '-'
                        }
                    </span>
                    
                </div>

                <div
                    className={styles['modal__blockInfo']}
                >

                    <h5
                        className={styles['modal__nameCategory']}
                    >
                        Знание доп блоков: 
                    </h5>

                    <span
                        className={styles['modal__nameHeCan']}
                    >

                        {person.he_can?.map( (block, index) => {

                            let blockSame: boolean;

                            if(
                                personToReplace && 
                                personToReplace.he_can && 
                                personToReplace.he_can.length > 0
                            ) {
                                blockSame = personToReplace?.he_can?.includes(block)
                                
                            } else {
                                blockSame = false
                            }

                            return(
                                <span
                                    key={`${index}+${block}`}
                                    className={`
                                        ${styles['modal__heCanName']}
                                        ${blockSame && styles['modal__heCanName--same']}
                                    `}
                                >

                                    {block}

                                </span>
                            )
                        })}

                        
                        
                    </span>
                    
                </div>

            </div>

        </div>

    )
}