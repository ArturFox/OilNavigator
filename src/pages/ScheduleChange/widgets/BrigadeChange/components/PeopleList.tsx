import type { Brigade } from '../../../../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../../../../entities/persons/types/persons.dto';
import { PeopleBrigade } from './PeopleBrigade';
import styles from './PeopleList.module.scss';

interface Props {
    brigadeSortArr: Brigade[];
    peopleMap: Map<string, Persons[]>;
    currentIndex: number;
}

export function PeopleList (
    {
        brigadeSortArr,
        peopleMap,
        currentIndex,
    }:Props
) {

    return (

        <article className={styles['peopleListWrapper']}>

            <ul
                className={styles['peopleListWrapper__peopleList']}
                style={{
                    
                    transform: `translateX(-${currentIndex * 100}%)`,
                    
                }}
            >

                {brigadeSortArr.map((brigade) => {

                    const brigadePeople = peopleMap.get(brigade.id) || [];

                    if (brigade.id === 'no_brigade') {

                        return (

                            <PeopleBrigade
                                brigade={brigade}
                                peopleArr={brigadePeople}
                            />

                        );

                    }

                    const doYouHaveAllPeople: boolean = brigadePeople.length >= 7;

                    let howMatch = 0;

                    if (!doYouHaveAllPeople) {
                        howMatch = 7 - brigadePeople.length;
                    }

                    return (

                        <PeopleBrigade
                            brigade={brigade}
                            peopleArr={brigadePeople}
                            howMatchNotPersons={howMatch}
                        />

                    );

                })}

            </ul>

        </article>
       
    )
}