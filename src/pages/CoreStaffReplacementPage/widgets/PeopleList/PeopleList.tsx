import styles from './PeopleList.module.scss';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { type Dispatch, type SetStateAction } from 'react';
import type { Brigade } from '@/entities/brigades/types/brigades.dto';

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

interface Props {

    people: Map<string, Persons[]>
    brigadeId: string;
    howMatch: number;
    brigadePeople: Persons[];

    listSelectedUsers: PersonObj[];
    onListSelectedUsers: Dispatch<SetStateAction<PersonObj[]>>;

    buttonSelectCheck: boolean;
    
    brigadesId: string[];
    brigadesNumber: number[];

    onApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

    brigades: Brigade[]

}

export function PeopleList(
    {
        brigadeId,
        howMatch,
        brigadePeople,
        
        buttonSelectCheck,
        
        brigadesId,
        brigadesNumber,
        
        listSelectedUsers,
        onListSelectedUsers,
        
        onApply,

        brigades,

        people

    }: Props
){   

    return (

        <li
            key={brigadeId}
            className={styles['brigadeSlide']}
        >

            <ul
                className={styles['brigadeSlide__peopleList']}
            >
                
                {howMatch > 0 &&

                    Array.from({ length: howMatch }).map((_, index) => (

                        <WorkItemCardFactory.workItemCardActionEmpty
                            key={`${index}+notPerson`}
                            items={brigades}
                            brigadeIdWhereEmptyCard={brigadeId}
                            getItemId={(brigade) => brigade.id}
                            getItemLabel={(brigade) => brigade.number_brigade}

                            people={people}
                            getPersonBrigadeId={(person) => person.id}
                            getPersonName={(person) => person.name}
                            getPersonSurname={(person) => person.surname}
                        />

                    ))

                }

                {brigadePeople.map((person) => {

                    return(

                        <>
                            <WorkItemCardFactory.workItemCardActionSeveral
                                key={person.id}

                                id={person.id}
                                name={person.name}
                                surname={person.surname}
                                otherSurname={person.other_surname}
                                job_title={person.job_title}
                                block={person.block}
                                discharge={person.discharge}
                                avalibleBlocks={person.he_can ?? []}

                                buttonSelectCheck={buttonSelectCheck}

                                brigadesId={brigadesId}
                                brigadesNumber={brigadesNumber}

                                listSelectedUsers={listSelectedUsers}
                                onListSelectedUsers={onListSelectedUsers}

                                onApply={onApply}

                            />

                        </>

                    )

                })}

            </ul>

        </li>

    );
    
}