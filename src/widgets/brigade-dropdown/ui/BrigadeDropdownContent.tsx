import type { PersonWithStatus } from "../model/types";
import styles from '../../../styles/blocks/dropdown.module.scss';
import { Link } from "react-router-dom";
import { ArrowRightLeft, Search } from "lucide-react";
import type { PersonsDto } from "../../../api/persons/persons.dto";
import { useDispatch } from "react-redux";
import { addPerson, setPesonFlag } from "../../../store/new-store";

interface Props {
    person: PersonWithStatus
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

export function BrigadeDropdownContent ({person}:Props) {

    const dispatch = useDispatch();

    const isOnVacation = person.redAlarm.includes('В отпуске');
    const isOnSick = person.redAlarm.includes('Больничный');
    const isOnStudy = person.redAlarm.includes('На обучении');

    const birthdayToday = person.birthdayStatus.includes('День рождения');

    const soonVacation = person.yellowAlarm.includes('Приближается отпуск');
    const soonStudy = person.yellowAlarm.includes('Приближается обучение');

    function fn(p: PersonsDto){
        dispatch(setPesonFlag(true))
        dispatch(addPerson(p))
    }

    function setPerson(p: PersonsDto | null){
         
        if(p){
            dispatch(addPerson(p));
        } else{
            dispatch(addPerson(emptyPerson));
        }
           
    }

    return (

        <>
            <div 
                key={`${person.brigade_id}-${person.id}`} 
                className={styles["article__dropdownArrPeople"]}
            >

                <div className={styles["article__dropdownPerson"]}>
                
                    <span>{person.name} {person.surname}</span>
            
                </div>

                {isOnVacation && <span className={styles["article__dropdownAlarm"]}>В отпуске!</span>}
                {isOnSick && <span className={styles["article__dropdownAlarm"]}>Больничный!</span>}
                {isOnStudy && <span className={styles["article__dropdownAlarm"]}>На обучении</span>}

                {birthdayToday && <span className={styles["article__dropdownAlarm"]}>Др!</span>}

                {soonVacation && <span className={styles["article__dropdownAlarmYellow"]}>Приближается отпуск</span>}
                {soonStudy && <span className={styles["article__dropdownAlarmYellow"]}>Приближается обучение</span>}

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

        </>
    )
}