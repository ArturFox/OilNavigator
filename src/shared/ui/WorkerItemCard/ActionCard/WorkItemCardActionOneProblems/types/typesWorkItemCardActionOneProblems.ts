import type { Dispatch, SetStateAction } from 'react';

type ObjectSelectUser = {
    id: string;
};

export interface WorkItemCardActionOneProblemsProps {
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

    redAlarm: string[];
    yellowAlarm: string[];
}