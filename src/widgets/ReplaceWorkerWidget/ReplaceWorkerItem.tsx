import styles from './ReplaceWorkerItem.module.scss';
import type { PersonsWithStatus } from '../../entities/persons/types/persons.dto';

interface Props {
    person: PersonsWithStatus;
    selected: string;
    onSelected: (value: string) => void;
    onSelectedPerson: (value: PersonsWithStatus | null) => void;
}

export function ReplaceWorkerItem ({person, selected, onSelected, onSelectedPerson}: Props) {

    const selectedBoolean: boolean = person.id === selected;

    const arrProblem = [
        ...person.yellowAlarm,
        ...person.redAlarm
    ];

    return(

        <li
            className={`
                ${styles["replaceWorkerItem"]}    
                ${person.redAlarm.length > 0 && styles["replaceWorkerItem--redAlarm"]}
            `}
        >

            <div
                className={styles["replaceWorkerItem__info"]}
            >
                <span
                    className={styles["replaceWorkerItem__info-name"]}
                >
                    {person.surname} {person.name} {person.other_surname}
                </span>

            </div>
            

            <div
                className={styles["replaceWorkerItem__status"]}
            >

                <span
                    className={styles["replaceWorkerItem__jobTitle"]}
                >
                    {person.job_title}/{person.block}
                </span>

                <div
                    className={styles["replaceWorkerItem__problem"]}
                >
                    {arrProblem.length > 0 
                        ?   <>
                                {arrProblem.map((problem, index) => (
                                    <span
                                        key={index}
                                    >
                                        {problem}
                                    </span>
                                ))}
                            </>
                        : <>Проблем не обноружены</>
                    }
                </div>

            </div>

            <div
                className={styles["replaceWorkerItem__buttonSelect"]}
            >
                <button
                    className={`
                        ${styles['replaceWorkerItem__buttonPress']}
                        ${selectedBoolean && styles["replaceWorkerItem__buttonPress--selected"]}
                    `}
                    onClick={() => {

                        if(selected === person.id){
                            onSelected('')
                            onSelectedPerson(null)
                        }else {
                            onSelected(person.id)
                            onSelectedPerson(person)
                        }
                        
                    }}
                >
                    {selectedBoolean 
                        ? 'Выбран'
                        : 'Выбрать'
                    }
                </button>
                
            </div>

            <div
                className={styles["replaceWorkerItem__buttonMore"]}
            >
                <button
                    className={styles["replaceWorkerItem__button2"]}
                    onClick={() => {
                        
                    }}
                >
                    Подробнее
                </button>
                
            </div>

        </li>
    )
}