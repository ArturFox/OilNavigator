import styles from './PeopleList.module.scss';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {

    brigadeId: string;

    brigadePeople: Persons[];

    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>;

    buttonSelectCheck: boolean;
    
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    onApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

}

export function PeopleList(
    {
        brigadeId,

        brigadePeople,

        listSelectedUsers,
        onListSelectedUsers,
        
        buttonSelectCheck,

        brigadesIdAndNumbers,
        
        onApply,

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

                {brigadePeople.map((person) => {

                    return(
                        
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

                            brigadesIdAndNumbers={brigadesIdAndNumbers}

                            listSelectedUsers={listSelectedUsers}
                            onListSelectedUsers={onListSelectedUsers}

                            onApply={onApply}

                        />

                    )

                })}

            </ul>

        </li>

    );
    
}