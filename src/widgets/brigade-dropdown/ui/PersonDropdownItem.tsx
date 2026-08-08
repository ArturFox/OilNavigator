import { useEffect, useState } from 'react';
import styles from './PersonDropdownItem.module.scss';
import { ArrowRightLeft, Plus, Search } from "lucide-react";
import type { PersonsDto } from '../../../entities/persons/types/persons.dto';

interface PersonStatus {
  redAlarm: string[];
  yellowAlarm: string[];
  birthdayStatus: string[];
}

type PersonDtoWithStatus = PersonsDto & PersonStatus;

interface Props {
  person?: PersonDtoWithStatus;
  isFutureDate?: boolean;
}

export function PersonDropdownItem ({person, isFutureDate}:Props) {

    const [currentProblem, setCurrentProblem] = useState<number>(0);

    if(!person){

        return (
            
            <li
                className={styles["personDropdownItem"]}
            >

                <div className={styles["personDropdownItem__personInfo"]}>
                
                    <span
                        className={styles["personDropdownItem__textNameAlarm"]}
                    >
                        Не хватает человека
                    </span>
            
                </div>

                <div className={styles["personDropdownItem__buttons"]}>
                    
                    <button 
                        className={styles["personDropdownItem__button"]}
                        type="button"
                        aria-label={`Не хватает человека`}
                    >
                        <Plus 
                            size={16}
                            aria-hidden={true}
                        />
                    </button>

                </div>

            </li>
            
        )
    }

    const arrProblem = [
        ...person.redAlarm,
        ...person.yellowAlarm,
    ];

    let problemsCount: boolean = false;

    if(arrProblem.length > 1){
        problemsCount = true;
    }

    useEffect(() => {

        if (arrProblem.length <= 1) return;

        const interval = setInterval(() => {

            setCurrentProblem((prev) => (prev + 1) % arrProblem.length);
        
        }, 1500);

        return () => clearInterval(interval);

    }, [arrProblem.length]);

    return (
        
        <li
            className={styles["personDropdownItem"]}
        >

            <div 
                className={styles["personDropdownItem__personInfo"]}
            >
            
                <span
                    className={`
                        ${styles["personDropdownItem__textName"]}
                        ${!isFutureDate && styles["personDropdownItem__textName--gray"]}
                    `}
                >
                    {person.surname}
                </span>

                <span
                    className={`
                        ${styles["personDropdownItem__textName"]}
                        ${!isFutureDate && styles["personDropdownItem__textName--gray"]}    
                    `}
                >
                    {person.name}
                </span>
        
            </div>

            {arrProblem.length > 0 && (
                <div>
                    <span
                        className={`
                            ${styles["personDropdownItem__alarmStatus"]}
                            ${["Отпуск", "Больничный", "Обучение"].includes(arrProblem[currentProblem])
                                ? styles["personDropdownItem__alarmStatus--red"]
                                : ["Скоро отпуск", "Скоро обучение"].includes(arrProblem[currentProblem])
                                    ? styles["personDropdownItem__alarmStatus--yellow"]
                                    : arrProblem[currentProblem] === "ДР"
                                        ? styles["personDropdownItem__alarmStatus--birthday"]
                                        : ''
                            }    
                        `}

                    >
                        {arrProblem[currentProblem]}
                    </span>

                    {problemsCount && (
                        <span
                            className={styles["personDropdownItem__textName"]}
                        >
                            ({arrProblem.length})
                        </span>
                    )}
                </div>

            )}

            <div className={styles["personDropdownItem__buttons"]}>

                <button
                    className={styles["personDropdownItem__button"]}
                    type="button"
                    aria-label={`Заменить ${person.name}`}
                >
                    
                    <ArrowRightLeft 
                        size={16}
                        aria-hidden={true}
                    />
                    
                </button>
                
                <button 
                    className={styles["personDropdownItem__button"]}
                    type="button"
                    aria-label={`Узнать информацию про ${person.name}`}
                >
                    <Search 
                        size={16}
                        aria-hidden={true}
                    />
                </button>

            </div>

        </li>
        
    )
} 