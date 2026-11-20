import styles from './PeopleList.module.scss';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {

    // хук useManageSeveralWorkItemCards
    isButtonSelectCheck: boolean;

    listSelectedUsers: string[];
    setListSelectedUsers: Dispatch<SetStateAction<string[]>>;

    isOpenModalSeveral: boolean;
    setIsOpenModalSeveral: (isOpenModalSeveral: boolean) => void;

    setIsApplymodalReplaceSeveral: Dispatch<SetStateAction<string | null>>;

    // хук useManageOnlyOneWorkItemCards
    setIsApplymodalReplaceOnlyOne: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

    brigadeId: string;
    brigadePeople: Persons[];
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];
    arrSelectButton: {
        id: string;
        name: string;
        surname: string;
    }[];
    isActiveSlide: boolean;
}

export function PeopleList(
    {
        brigadeId,

        brigadePeople,

        listSelectedUsers,
        setListSelectedUsers,

        brigadesIdAndNumbers,
        
        setIsApplymodalReplaceOnlyOne,

        isButtonSelectCheck,
        isOpenModalSeveral,
        setIsOpenModalSeveral,
        arrSelectButton,
        setIsApplymodalReplaceSeveral,
        isActiveSlide
    }: Props
){   

    const persons = brigadePeople.map((person) => ({
        id: person.id,
        name: person.name,
        surname: person.surname,
        otherSurname: person.other_surname,
        job_title: person.job_title,
        block: person.block,
        discharge: person.discharge,
        avalibleBlocks: person.he_can ?? [],
    }));

    return (

        <li
            key={brigadeId}
            className={styles['brigadeSlide']}
        >

            <ul
                className={styles['brigadeSlide__peopleList']}
            >

                <WorkItemCardFactory.workItemCardActionSeveral

                    setIsApplymodalReplaceOnlyOne={setIsApplymodalReplaceOnlyOne}
                    setIsApplymodalReplaceSeveral={setIsApplymodalReplaceSeveral}

                    persons={persons}
                    brigadesIdAndNumbers={brigadesIdAndNumbers}
                    listSelectedUsers={listSelectedUsers}
                    onListSelectedUsers={setListSelectedUsers}

                    isButtonSelectCheck={isButtonSelectCheck}
                    isOpenModalSeveral={isOpenModalSeveral}
                    setIsOpenModalSeveral={setIsOpenModalSeveral}
                    arrSelectButton={arrSelectButton}
                    
                    isActiveSlide={isActiveSlide}
                />

            </ul>

        </li>

    );
    
}