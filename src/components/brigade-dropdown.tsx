import { useEffect, useState } from "react";
import { ArrowDownWideNarrow, OctagonAlert, BadgeCheck, Search } from "lucide-react";
import type { BrigadeShift, Person } from "../types/schedule";
import styles from '../styles/blocks/dropdown.module.scss'
import { useDispatch } from "react-redux";
import { addPerson, changePeson } from "../store/new-store";

interface BrigadeDropdownProps {
  people: Person[][];
  shift: BrigadeShift
  text: string
}


export function BrigadeDropdown({people, shift, text}: BrigadeDropdownProps) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [notHuman, setNotHuman] = useState<boolean>(false);

    const peopl = people.flat().filter((e) => e.brigade === shift.brigade)

    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    const todayDate = new Date();

    const alarmPeople = peopl
    .filter((f) => {

      const start = parseDate(f.vacationStart);
      const end = parseDate(f.vacationEnd);

      return todayDate >= start && todayDate <= end;

    })

    useEffect(() => {
        setNotHuman(peopl.length < 7);
    }, [peopl]);

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
                                {notHuman ? <OctagonAlert/> : <BadgeCheck/>}
                            </div>

                            <div className={styles["article__viewTopRighteBlock"]}>
                                <span>{text} {shift.brigade}</span>
                                <span className={styles["article__viewInformation"]}>Информационное поле</span>
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

                {peopl?.map((person) => {

                    const isOnVacation = alarmPeople.includes(person);

                    return (

                        <div 
                            key={`${person.brigade}-${person.id}`} 
                            className={styles["article__dropdownArrPeople"]}
                        >

                            <div className={styles["article__dropdownPerson"]}>
                                <span>{person.name} {person.surname}</span>
                                <span>{person.jobTitle}</span>
                            </div>

                            {isOnVacation && (
                                <div>!!!</div>
                            )}

                            <button 
                                className={styles["article__dropdownSearch"]}
                                onClick={() => fn(person)}
                            >
                                    <Search size={16}/>
                            </button>

                        </div>

                    )
}               )}

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
