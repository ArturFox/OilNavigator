import type { BrigadesDto } from "../../../api/brigades/brigades.dto";
import type { PersonsDto } from "../../../api/persons/persons.dto";
import type { SortShift } from "../../../api/shifts/shifts.dto";
import { useMemo, useState } from "react";
import { getPersonStatuses } from "../model/lib/getPersonStatuses";
import { isBrigadeUnderstaffed } from "../model/lib/isBrigadeUnderstaffed";
import styles from '../../../styles/blocks/dropdown.module.scss';
import { BrigadeDropdownContent } from "./BrigadeDropdownContent";
import { BrigadeDropdownView } from "./BrigadeDropdownView";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPerson } from "../../../store/new-store";
import type { PersonWithStatus } from "../model/types";

interface Props {
    people: PersonsDto[];
    shift: SortShift;
    stringDate: string;
    brigadeProps: BrigadesDto | undefined
}

const emptyPerson: PersonsDto = {
    id: '',
    name: '',
    surname: '',
    other_surname: '',
    discharge: 0,
    brigade_id: null,
    block: null,
    job_title: '',
    phone_number: '',
    birthday: null,
    vacation_start: null,
    vacation_end: null,
    he_can: null,
    sick_start: null,
    sick_end: null,
    brigade_name: '',
    study_start: '',
    study_end: '',
};

export function BrigadeDropdown({people, shift, stringDate, brigadeProps}: Props) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const notHuman: boolean = isBrigadeUnderstaffed(people);

    const peopleWithStatus: PersonWithStatus[] = useMemo(() => {

        return getPersonStatuses(people,stringDate)

    }, [people, stringDate]);

    const hasRedAlarm: boolean = peopleWithStatus.some(p => p.redAlarm.length > 0) || notHuman;
    const hasYellowAlarm: boolean = peopleWithStatus.some(p => p.yellowAlarm.length > 0);
    const hasBirthday: boolean = peopleWithStatus.some(p => p.birthdayStatus.length > 0);

    function setPerson(p: PersonsDto | null): void{
             
        if(p){
            dispatch(addPerson(p));
        } else{
            dispatch(addPerson(emptyPerson));
        }
               
    }

    return (

        <article className={styles["article"]}>

            <div 
                className={styles["article__view"]} 
                onClick={() => setOpen(!open)} 
                role="button"
            >

                <BrigadeDropdownView
                    hasRedAlarm={hasRedAlarm}
                    hasYellowAlarm={hasYellowAlarm}
                    hasBirthday={hasBirthday}
                    open={open}
                    shift={shift}
                    brigadeName={brigadeProps?.name ?? 'Такой бригады нету'}
                />

            </div>

            <div  
                className={`${styles.article__dropdown} 
                ${open ? styles['article__dropdown_open'] : ''}`}
            >

                {peopleWithStatus?.map((person) => (

                    <BrigadeDropdownContent
                        key={person.id} 
                        person={person} 
                    />
                ))}

                {notHuman && (

                <div className={styles["article__dropdownAdd"]}>
                    
                    <span className={styles["article__dropdownNotPerson"]}>
                        Не хватает человека
                    </span>

                    <Link to={'/changePerson'}>
                        <button 
                            onClick={() => setPerson(emptyPerson)}
                            className={styles["article__dropdownAddButton"]}
                        >
                                Добавить
                        </button>
                    </Link>
                    
                
                </div>

            )}
                
            </div>

        </article>
    );
}