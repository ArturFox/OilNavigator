import { useMemo, useRef, useState } from "react";
import styles from '../ui/brigadeDropdown.module.scss';
import type { PersonsDto } from "../../../entities/persons/types/persons.dto";
import type { SortShift } from "../../../entities/shifts/types/shifts.dto";
import type { BrigadesDto } from "../../../entities/brigades/types/brigades.dto";
import { getPersonStatus } from "../model/getPersonStatus";
import { PersonDropdownItem } from "./PersonDropdownItem";
import { PersonCard } from "./PersonCard";

interface Props {
    people: PersonsDto[];
    shift: SortShift;
    dateStore: string;
    brigadeProps: BrigadesDto | undefined;
    isFutureDate: boolean
}

export function BrigadeDropdown({people, shift, dateStore, brigadeProps, isFutureDate}: Props) {

    // Состояние для открытия списка людей
    const [open, setOpen] = useState<boolean>(false);

    // Ref для плавного оькрытия списка людей
    // Мы берем через метод dropdownRef.current?.scrollHeight
    // Делаем высоту height: 0 и overflow: hidden и opacity: 0;
    // То есть в DOM он есть просто обрезан, но мы сразу положили его реальную высоту 
    // если сделать фиксированную высоту через max-height, то может терятся плавность
    const dropdownRef = useRef<HTMLUListElement>(null);

    // Если в бригаде меньше 7 человек, то это true
    // и покажем в интерфейсе сколько человек не хваатает 
    let notHuman: boolean;
    let howManyNotHuman: number;

    if(isFutureDate){
        notHuman = people.length < 7;
        howManyNotHuman = 7 - people.length;
    } else {
        notHuman = false
        howManyNotHuman = 0
    }

    // Тут передаем людей из одной бригады и дату из стора.
    // Для каждого сотрудника вычисляем его текущие статусы.
    // redAlarm:
    // - находится в отпуске;
    // - находится на больничном;
    // - находится на обучении.
    // yellowAlarm:
    // - отпуск начнется в течение следующих 7 дней;
    // - обучение начнется в течение следующих 7 дней.
    // birthdayStatus:
    // - день рождения совпадает с выбранной датой.
    // В результате получаем новый массив, где к каждому объекту
    // сотрудника добавляются поля redAlarm, yellowAlarm и birthdayStatus.
    const peopleWithStatus = useMemo(() => {

        if (!isFutureDate) {
            return people.map((person) => ({
                ...person,
                redAlarm: [],
                yellowAlarm: [],
                birthdayStatus: [],
            }));
        }

        return getPersonStatus(people, dateStore)

    }, [people, dateStore]);

    const hasRedAlarm: boolean = peopleWithStatus.some(p => p.redAlarm.length > 0) || notHuman;
    const hasYellowAlarm: boolean = peopleWithStatus.some(p => p.yellowAlarm.length > 0);
    const hasBirthday: boolean = peopleWithStatus.some(p => p.birthdayStatus.length > 0);

    return (

        <li
            className={`
                ${styles['card']}
                ${!isFutureDate && styles['card--isFutureDate']}    
            `}
        >

            <button
                type="button"
                className={styles["card__button"]}
                onClick={() => setOpen(!open)} 
                aria-expanded={open}
                aria-controls={`brigade-dropdown-${brigadeProps?.id}`}
                aria-label={`
                    ${brigadeProps?.name ?? 'Бригада'}. 
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
                    open={open}
                    shift={shift}
                    brigadeName={brigadeProps?.name ?? 'Такой бригады нету'}
                    isFutureDate={isFutureDate}
                />

            </button>

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
                aria-label={`Сотрудники бригады ${brigadeProps?.name}`}
            >

                {peopleWithStatus.map((person) => (

                    <PersonDropdownItem
                        key={person.id}
                        person={person}
                        isFutureDate={isFutureDate}
                    />

                ))}

                {notHuman && isFutureDate && (

                
                    Array.from({length: howManyNotHuman}).map((_, index) => (
                        <PersonDropdownItem 
                            key={`${index}+Нету человека`}
                        />
                    ))
                    
                )}

            </ul>

        </li>
    );
}