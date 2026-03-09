import { useEffect, useMemo, useState } from "react";
import { ArrowDownWideNarrow, OctagonAlert, BadgeCheck, Search, Cake, ArrowRightLeft } from "lucide-react";
import styles from '../styles/blocks/dropdown.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { addPerson, setChangePerson, setPesonFlag, type RootState } from "../store/new-store";
import type { BrigadesDto } from "../api/brigades/brigades.dto";
import type { PersonsDto } from "../api/persons/persons.dto";
import type { SortShift } from "../api/shifts/shifts.dto";
import { Link } from "react-router-dom";

interface BrigadeDropdownProps {
  people: PersonsDto[];
  shift: SortShift;
  stringDate: string;
  brigadesProps: Map<string,BrigadesDto>
}

export function BrigadeDropdown({people, shift, stringDate, brigadesProps}: BrigadeDropdownProps) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [notHuman, setNotHuman] = useState<boolean>(false);

    const brigadeName = brigadesProps.get(shift.brigade)?.name

    const peopleWithStatus = useMemo(() => {

        const today = new Date(stringDate);

        const sevenDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        );

        const stringSevendDays = `${sevenDays.getFullYear()}-${String(sevenDays.getMonth()+1).padStart(2,'0')}-${String(sevenDays.getDate()).padStart(2,'0')}`;
        

        return people.map((person) => {
            
            const status: string[] = [];
            const yellowAlarm: string[] = [];
            const birthday: string[] = [];

            if( person.vacation_start && person.vacation_end && stringDate >= person.vacation_start && stringDate <= person.vacation_end){
                status.push('В отпуске')
            }
            if( person.sick_start && person.sick_end && stringDate >= person.sick_start && stringDate <= person.sick_end){
                status.push('Больничный')
            }

            if( person.vacation_start && person.vacation_start > stringDate && person.vacation_start <= stringSevendDays){
                yellowAlarm.push('Приближается отпуск')
            }

            if( person.birthday && person.birthday === stringDate){
                birthday.push('День рождения')
            }

            return {...person, status, yellowAlarm, birthday}
        
        });

    }, [people, stringDate]);

    const hasProblems = peopleWithStatus.some(p => p.status.length > 0) || notHuman;
    const hasYellowAlarm = peopleWithStatus.some(p => p.yellowAlarm.length > 0);
    const hasBirthday = peopleWithStatus.some(p => p.birthday.length > 0);

    useEffect(() => {
        setNotHuman(people.length < 7);
    }, [people]);

    function fn(p: BrigadesDto){
        dispatch(setPesonFlag(true))
        dispatch(addPerson(p))
    }

    
    const h = useSelector((state: RootState) => state.date.changePerson);

    function setPerson(p: BrigadesDto){
        dispatch(setChangePerson(!h))
         
        dispatch(addPerson(p));
           
        
    }

    return (

        <article className={styles["article"]}>

            <div className={styles["article__view"]} onClick={() => setOpen(!open)}>

                    <div className={styles["article__viewTop"]}>

                        <div className={styles["article__viewFirstBlock"]}>

                            <div className={styles["article__viewTopIcone"]}>
                                {hasProblems && hasYellowAlarm
                                    ? <OctagonAlert className={styles["article__viewTopIconeColorRedandYellow"]}/> 
                                    : hasProblems
                                        ? <OctagonAlert className={styles["article__viewTopIconeColorRed"]}/> 
                                        : hasYellowAlarm
                                            ? <OctagonAlert className={styles["article__viewTopIconeColorYellow"]}/> 
                                            : <BadgeCheck className={styles["article__viewTopIconeColorGreen"]}/>
                                }
                            </div>

                            <div className={styles["article__viewTopRighteBlock"]}>

                                {hasBirthday 

                                ?   <span className={styles["article__viewTopRighteBlockBirthday"]}>
                                        {brigadeName} <Cake size={20}/>
                                    </span>

                                :   <span>
                                        {brigadeName}
                                    </span>
                                }
                                
                                {hasProblems && hasYellowAlarm
                                    ? (<span className={styles["article__viewTopRighteBlockAlarm"]}>
                                            Что-то не так
                                        </span>)
                                    : hasProblems
                                        ? (<span className={styles["article__viewTopRighteBlockAlarmRed"]}>
                                                Что-то не так
                                            </span>) 
                                        : hasYellowAlarm
                                            ? (<span className={styles["article__viewTopRighteBlockAlarmYellow"]}>
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
                    
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{shift.russianDate}</span>
                        <span>{shift.startTime} - {shift.endTime}</span>
                    </div>

            </div>

            <div  className={`${styles.article__dropdown} ${open ? styles['article__dropdown_open'] : ''}`}>

                {peopleWithStatus?.map((person) => {

                    const isOnVacation = person.status.includes('В отпуске');
                    const birthdayToday = person.birthday.includes('День рождения');
                    const isOnSick = person.status.includes('Больничный');
                    const soonVacation = person.yellowAlarm.includes('Приближается отпуск');

                    return (

                        <div 
                            key={`${person.brigade_id}-${person.id}`} 
                            className={styles["article__dropdownArrPeople"]}
                        >

                            <div className={styles["article__dropdownPerson"]}>
                               
                                <span>{person.name} {person.surname}</span>
                        
                            </div>

                            {isOnVacation && <span className={styles["article__dropdownAlarm"]}>В отпуске!</span>}
                            {birthdayToday && <span className={styles["article__dropdownAlarm"]}>Др!</span>}
                            {isOnSick && <span className={styles["article__dropdownAlarm"]}>Больничный!</span>}
                            {soonVacation && <span className={styles["article__dropdownAlarmYellow"]}>Приближается отпуск</span>}

                            <div style={{display: 'flex', gap: '10px'}}>

                                <Link to={'/changePerson'}>
                                    <button onClick={() => setPerson(person)} className={styles["article__dropdownSearch"]}>
                                        <ArrowRightLeft size={16}/>
                                    </button>
                                </Link>

                                <button 
                                    className={styles["article__dropdownSearch"]}
                                    onClick={() => fn(person)}
                                >
                                        <Search size={16}/>
                                </button>

                            </div>

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
                                Пока нету Добавить
                        </button>
                        
                    
                    </div>

                )}
                
            </div>

            

        </article>
    );
}
