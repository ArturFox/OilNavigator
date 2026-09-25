import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import styles from './BrigadeList.module.scss';

interface Props {
    brigadeSortArr: Brigade[];
    brigadeClick: string;
    onBrigadeClick: (brigadeClick: string) => void;
    peopleMap: Map<string, Persons[]>;
}

export function BrigadeList (
    {
        brigadeSortArr,
        brigadeClick,
        onBrigadeClick,
        peopleMap
    }:Props
) {

    return (

        <ul
            className={styles['brigadeList']}
        >

            {brigadeSortArr.map((brigade) => {

                const currentBrigade: boolean = brigadeClick === brigade.id

                if (brigade.id === 'no_brigade') {

                    return (

                        <li 
                            className={`
                                ${styles['brigadeList__brigadeItem']}
                                ${currentBrigade && styles['brigadeList__brigadeItem--current']}    
                            `}
                            key={brigade.id}
                        >

                            <button
                                onClick={() => {
                                    onBrigadeClick(brigade.id);
                                }}
                                className={`
                                    ${styles['brigadeList__brigadeItemButton']}
                                `}
                            >
                                0
                            </button>
                        </li>
                    );
                }

                const currentPeople = peopleMap.get(brigade.id) ?? [];

                const doYouHaveAllPeople: boolean = currentPeople.length >= 7;
                
                return (

                    <li
                        key={brigade.id}
                        className={`
                            ${styles['brigadeList__brigadeItem']}
                            ${!doYouHaveAllPeople 
                                ? currentBrigade
                                    ? styles['brigadeList__brigadeItem--current']
                                    : styles['brigadeList__brigadeItem--red']
                                : ''
                            }
                            ${currentBrigade && styles['brigadeList__brigadeItem--current']}
                        `}
                        
                    >

                        <button
                            onClick={() => {
                                onBrigadeClick(brigade.id);
                            }}
                            className={`
                                ${styles['brigadeList__brigadeItemButton']}
                            `}
                        >
                            {brigade.number_brigade}
                        </button>

                    </li>

                )

            })}
                
        </ul>
    )
}