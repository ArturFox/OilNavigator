import type { Dispatch, SetStateAction } from "react";

export interface WorkItemCardActionSeveralProps {

    setIsApplymodalReplaceSeveral: Dispatch<SetStateAction<string | null>>
    setIsApplymodalReplaceOnlyOne: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

    persons: {
        id: string;
        name: string;
        surname: string;
        otherSurname: string;
        job_title: string,
        block: string,
        discharge: number,
        avalibleBlocks: string[];
    }[]

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>;

    isButtonSelectCheck: boolean;
    isOpenModalSeveral: boolean;
    setIsOpenModalSeveral: (isOpenModalSeveral: boolean) => void;

    arrSelectButton: {
        id: string;
        name: string;
        surname: string;
    }[];
    isActiveSlide: boolean;

}