import type { Dispatch, SetStateAction } from 'react';

type ObjectSelectUser = {
    id: string;
};

export interface WorkItemCardActionOneProps {
    id: string;
    name: string;
    surname: string;
    otherSurname: string;
    job_title: string;
    block: string;
    discharge: number;
    avalibleBlocks: string[];

    objectSelectUser: ObjectSelectUser | null;
    onObjectSelectUser: Dispatch<SetStateAction<ObjectSelectUser | null>>;
}