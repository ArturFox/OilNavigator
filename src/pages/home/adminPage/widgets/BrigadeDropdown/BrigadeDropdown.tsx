import { useRef, useState } from "react";
import styles from './BrigadeDropdown.module.scss';
import type { SortShift } from "../../../../../entities/shifts/types/shifts.dto";
import type { PersonsWithStatus } from "../../../../../entities/persons/types/persons.dto";
import { ArrowDownWideNarrow } from "lucide-react";
import { PersonCard } from "./components/PersonCard";
import { PersonDropdownItem } from "./components/PersonDropdownItem";

interface Props {
    shift: SortShift;
    shiftsToday: SortShift[];
}

export function BrigadeDropdown(
    { 
        shift, 
        shiftsToday,
    }: Props
) {

    // вытаскиваем массив людей именно кто работает в этот день
    const people: PersonsWithStatus[] = shift.peopleOnThisDay;

    // Состояние для открытия списка людей
    const [open, onOpen] = useState<boolean>(false);

    // Ref для плавного оькрытия списка людей
    // Мы берем через метод dropdownRef.current?.scrollHeight
    // Делаем высоту height: 0 и overflow: hidden и opacity: 0;
    // То есть в DOM он есть просто обрезан, но мы сразу положили его реальную высоту 
    // если сделать фиксированную высоту через max-height, то может терятся плавность
    const dropdownRef = useRef<HTMLUListElement>(null);

    const hasRedAlarm: boolean = shift.hasRedAlarm;
    const hasYellowAlarm: boolean = shift.hasYellowAlarm;
    
    return (

        <li
            className={`
                ${styles['card']}
                ${shift.isFutureDate && styles['card--isFutureDate']}    
                
            `}
        >

            <div
                className={styles["card__button"]}
                aria-controls={`brigade-dropdown-${shift.brigade?.id}`}
                aria-label={`
                    ${shift.brigade?.name ?? 'Бригада'}. 
                    ${
                        hasRedAlarm || hasYellowAlarm
                            ? 'Есть проблемы.'
                            : 'Проблем нет.'
                    } 
                    ${open ? 'Свернуть список.' : 'Развернуть список.'}
                `}
            >

                <PersonCard
                    hasRedAlarm={hasRedAlarm}
                    hasYellowAlarm={hasYellowAlarm}
                    shift={shift}
                />

            </div>

            <div
                className={`
                    ${styles["card__arrowDownWideNarrowBlock"]}
                           
                `}
            >
                <button 
                    onClick={() => {
                        onOpen(!open)
                    }}
                    className={`
                        ${styles["card__arrowDownWideNarrow"]}
                        ${shift.isFutureDate === false && styles["card__arrowDownWideNarrow--gray"]}       
                    `}
                >

                    <ArrowDownWideNarrow
                        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
                    />

                </button>
            </div>

            <ul 
                ref={dropdownRef}
                className={`
                    ${styles["card__peopleList"]}
                    ${open 
                        ? styles["card__peopleList--open"]
                        : ''
                    }    
                `} 
                style={
                    {height: open
                        ? `${dropdownRef.current?.scrollHeight ?? 0}px`
                        : "0px",
                    }
                }
                aria-label={`Сотрудники бригады ${shift.brigade?.name}`}
            >

                {people.map((person) => (

                    <PersonDropdownItem
                        key={person.id}
                        personWhoWasReplacedId={person}
                        isFutureDate={shift.isFutureDate} 
                        startDate={shift.startDate}
                        personWhoWasReplacedBrigadeId={shift.brigade.id}
                        shiftsToday={shiftsToday}
                    />

                ))}

                {shift.notHuman && shift.isFutureDate && (

                    Array.from({length: shift.howManyNotHuman}).map((_, index) => (

                        <PersonDropdownItem 
                            key={`${index}+Нету человека`}
                            isFutureDate={shift.isFutureDate}
                            startDate={shift.startDate}
                            personWhoWasReplacedBrigadeId={shift.brigade.id}
                            shiftsToday={shiftsToday}
                        />
                        
                    ))
                    
                )}

            </ul>

        </li>
    );
}