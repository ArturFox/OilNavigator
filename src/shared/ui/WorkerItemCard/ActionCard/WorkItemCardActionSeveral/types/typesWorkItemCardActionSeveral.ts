import type { Dispatch, SetStateAction } from "react";

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

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>;

    onApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

}