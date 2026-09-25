import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import { Person } from '../Person/Person';
import styles from './PeopleBrigade.module.scss';

interface Props {
    brigade: Brigade;
    peopleArr: Persons[];
    howMatchNotPersons?: number;
}

export function PeopleBrigade (
    {
        brigade,
        peopleArr,
        howMatchNotPersons
    }: Props
) {

    return (

        <li
            key={brigade.id}
            className={styles['peopleBrigade']}
        >

            <ul
                className={styles['peopleBrigade__peopleList']}
            >
                
                {(howMatchNotPersons && 
                  howMatchNotPersons > 0
                ) ?
                    Array.from({ length: howMatchNotPersons }).map((_, index) => (

                        <Person
                            key={`${index}+notPerson`}
                            person={null}
                        />

                    ))
                   : null

                }

                {peopleArr.map((person) => (

                    <Person
                        key={person.id}
                        person={person}
                    />

                ))}

            </ul>

        </li>
    )
}