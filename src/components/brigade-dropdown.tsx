import { useEffect, useMemo, useState } from "react";
import { ArrowDownWideNarrow, OctagonAlert, BadgeCheck, Search } from "lucide-react";
import type { BrigadeShift, Person } from "../types/schedule";
import styles from '../styles/blocks/dropdown.module.scss'
import { useDispatch } from "react-redux";
import { addPerson, changePeson } from "../store/new-store";

interface BrigadeDropdownProps {
  people: Person[];
  shift: BrigadeShift;
}


export function BrigadeDropdown({people, shift}: BrigadeDropdownProps) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [notHuman, setNotHuman] = useState<boolean>(false);

    const parseDate = (dateStr: string) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    const plusSevenDays = (todayDate: Date): Date => {
        
        const newDate = new Date(todayDate);

        newDate.setDate(newDate.getDate() + 7);

        return newDate
    }
    
    const peopleWithStatus = useMemo(() => {

        const todayDate = new Date();

        return people.map((f) => {

            const startVacation = parseDate(f.vacationStart);
            const endVacation = parseDate(f.vacationEnd);
            const birthday = parseDate(f.birthday);
            const startSick = parseDate(f.sickStart);
            const endSick = parseDate(f.sickEnd);
            const weekLater = plusSevenDays(todayDate);

            const status: string[] = [];

            if (startVacation && endVacation && todayDate >= startVacation && todayDate <= endVacation) {
                status.push('В отпуске');
            }

            if (startVacation && startVacation > todayDate && startVacation <= weekLater) {
                status.push('Приближается отпуск');
            }

            if (birthday && birthday.getDate() === todayDate.getDate() &&
                birthday.getMonth() === todayDate.getMonth()) {
                status.push('День рождения');
            }

            if (startSick && endSick && todayDate >= startSick && todayDate <= endSick) {
                status.push('Больничный');
            }

            return {...f, status}
        
        });

    }, [people]);

    const hasProblems = peopleWithStatus.some(p => p.status.length > 0) || notHuman;

    useEffect(() => {
        setNotHuman(people.length < 7);
    }, [people]);

    function fn(p: Person){
        dispatch(changePeson(true))
        dispatch(addPerson(p))
    }

    return (

        <article className={styles["article"]}>

            <div className={styles["article__view"]} onClick={() => setOpen(!open)}>

                    <div className={styles["article__viewTop"]}>

                        <div className={styles["article__viewFirstBlock"]}>

                            <div className={styles["article__viewTopIcone"]}>
                                {hasProblems
                                    ? <OctagonAlert className={styles["article__viewTopIconeColorRed"]}/> 
                                    : <BadgeCheck className={styles["article__viewTopIconeColorGreen"]}/>
                                }
                            </div>

                            <div className={styles["article__viewTopRighteBlock"]}>

                                <span>Бригада №{shift.brigade}</span>
                                
                                {hasProblems
                                    ? (<span className={styles["article__viewTopRighteBlockAlarm"]}>
                                            Что-то не так
                                        </span>)
                                    : (<span className={styles["article__viewTopRighteBlockGood"]}>
                                            Проблем нет
                                        </span>)
                                }

                            </div>

                        </div>

                        <div className={styles["article__viewSecondBlock"]}>
                            <ArrowDownWideNarrow style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}/>
                        </div>

                    </div>

                    <div className={styles["article__viewLine"]}></div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{shift.startDate}</span>
                        <span>{shift.startTime} - {shift.endTime}</span>
                    </div>

            </div>

            <div  className={`${styles.article__dropdown} ${open ? styles['article__dropdown_open'] : ''}`}>

                {peopleWithStatus?.map((person) => {

                    const isOnVacation = person.status.includes('В отпуске');
                    const birthdayToday = person.status.includes('День рождения');
                    const isOnSick = person.status.includes('Больничный');
                    const soonVacation = person.status.includes('Приближается отпуск');

                    return (

                        <div 
                            key={`${person.brigade}-${person.id}`} 
                            className={styles["article__dropdownArrPeople"]}
                        >

                            <div className={styles["article__dropdownPerson"]}>
                               
                                <span>{person.name} {person.surname}</span>
                        
                            </div>

                            {isOnVacation && <span className={styles["article__dropdownAlarm"]}>В отпуске!</span>}
                            {birthdayToday && <span className={styles["article__dropdownAlarm"]}>Др!</span>}
                            {isOnSick && <span className={styles["article__dropdownAlarm"]}>Больничный!</span>}
                            {soonVacation && <span className={styles["article__dropdownAlarm"]}>Приближается отпуск</span>}

                            <button 
                                className={styles["article__dropdownSearch"]}
                                onClick={() => fn(person)}
                            >
                                    <Search size={16}/>
                            </button>

                        </div>

                    )
                })}

                {notHuman && (

                    <div className={styles["article__dropdownAdd"]}>
                        
                        <span className={styles["article__dropdownNotPerson"]}>
                            Не хватает человека
                        </span>

                        <button 
                            
                            className={styles["article__dropdownAddButton"]}
                        >
                                Добавить
                        </button>
                    
                    </div>

                )}
                
            </div>

            

        </article>
    );
}
