import { useDispatch } from 'react-redux'
import styles from '../styles/blocks/alarm-people.module.scss'
import type { Person } from '../types/schedule'
import { addPerson, changePeson } from '../store/new-store'

type alarmPeopleType = Person & {
  status: string[]
}

interface Props {
    alarm: alarmPeopleType
}

export function AlarmPeople ({alarm}: Props) {

    const dispatch = useDispatch();

    function fn(){

        const { status, ...personWithoutStatus } = alarm
        
            dispatch(changePeson(true))
            dispatch(addPerson(personWithoutStatus))
    }

    return(
        <div className={styles["block"]}>

            <span className={styles["block__nameAndSurname"]}>
                {alarm.name} {alarm.surname} {`Бр-${alarm.brigade}`}
            </span>

            
            <div className={styles["block__sick"]}>
                {alarm.status.map(g => {

                    let sickS;
                    let sickE;

                    let vacationS;
                    let vacationE;

                    if(g === 'Больничный'){
                        sickS = alarm.sickStart
                        sickE = alarm.sickEnd
                    }

                    if(g === 'В отпуске'){
                        vacationS = alarm.vacationStart
                        vacationE = alarm.vacationEnd
                    }

                    return(
                        <div 
                            key={`${alarm.name}-${alarm.surname}${alarm.otherSurname}-${alarm.block}-${alarm.block}`}
                            className={styles["block__date"]}
                            onClick={fn}
                        >

                            <span>
                                {g} c 
                            </span>

                            <span>
                                {sickS ? sickS : vacationS} - {sickE ? sickE : vacationE}
                            </span>

                        </div>
                    )
                })}
            </div>
            

        </div>
    )
}