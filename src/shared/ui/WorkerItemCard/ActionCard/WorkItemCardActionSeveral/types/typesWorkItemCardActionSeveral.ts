import type { Dispatch, SetStateAction } from "react";

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export interface WorkItemCardActionSeveralProps {
    id: string;
    name: string;
    surname: string;
    otherSurname: string;
    job_title: string,
    block: string,
    discharge: number,
    avalibleBlocks: string[];

    buttonSelectCheck: boolean;

    brigadesId: string[];
    brigadesNumber: number[];

    listSelectedUsers: PersonObj[];
    onListSelectedUsers: Dispatch<SetStateAction<PersonObj[]>>;

    onApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

}