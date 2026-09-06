import { useEffect, useState } from 'react';
import styles from './PersonDropdownItem.module.scss';
import { ArrowRightLeft, Plus, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import type { PersonsWithStatus } from '../../../../../../entities/persons/types/persons.dto';
import type { Brigade } from '../../../../../../entities/brigades/types/brigades.dto';
import type { SortShift } from '../../../../../../entities/shifts/types/shifts.dto';
import { ModalCenterWindow } from '../../../../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';

interface Props {
  person?: PersonsWithStatus;
  isFutureDate?: boolean;
  brigade?: Brigade | undefined;
  shift?: SortShift;
}

export function PersonDropdownItem (
    {
        person, 
        isFutureDate,  
        shift
    }:Props
) {

    const navigate = useNavigate();

    const [currentProblem, onCurrentProblem] = useState<number>(0);
    const [modalCenter, onModalCenter] = useState<boolean>(false);

    if(!person || !shift){

        return (
            
            <li
                className={`
                    ${styles["personDropdownItem"]}
                    ${styles["personDropdownItem-notHuman"]}
                `}
            >

                <div 
                    className={`
                        ${styles["personDropdownItem__personInfo"]}
                        ${styles["personDropdownItem__personInfo-notHuman"]}
                    `}
                >
            
                    <span
                        className={`
                            ${styles["personDropdownItem__textName--notHuman"]}
                        `}
                    >
                        Не хватает 
                    </span>

                </div>

                <div className={styles["personDropdownItem__buttons"]}>
                    
                    <button 
                        className={styles["personDropdownItem__button"]}
                        type="button"
                        aria-label={`Не хватает человека`}
                        onClick={() => {
                            navigate('/userChange')
                            console.log('zzz')
                        }}
                        disabled={isFutureDate === false}
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

    const arrProblem: string[] = [
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

            onCurrentProblem((prev) => (prev + 1) % arrProblem.length);
        
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

            {arrProblem.length > 0 
                ? (
                    <div
                        className={styles["personDropdownItem__alarmBlock"]}
                    >
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
                )
                : (
                    <div
                        className={styles["personDropdownItem__alarmBlock"]}
                    >

                    </div>
                )
                

            }

            <div className={styles["personDropdownItem__buttons"]}>

                <button
                    className={styles["personDropdownItem__button"]}
                    type="button"
                    aria-label={`Заменить ${person.name}`}
                    onClick={() => navigate('/userChange', {
                        state: {
                            person,
                            shift,
                            arrProblem,
                        },
                    })}
                    disabled={isFutureDate === false}
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
                    onClick={() => onModalCenter(!modalCenter)}
                    disabled={isFutureDate === false}
                >
                    <Search 
                        size={16}
                        aria-hidden={true}
                    />
                </button>

            </div>

            <ModalCenterWindow
                person={person}
                modalCenter={modalCenter}
                onModalCenter={onModalCenter}
            />

        </li>
        
    )
} 