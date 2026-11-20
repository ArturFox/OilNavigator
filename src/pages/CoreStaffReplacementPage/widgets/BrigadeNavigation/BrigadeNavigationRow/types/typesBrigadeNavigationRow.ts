import type { Dispatch, SetStateAction } from "react";

export interface BrigadeNavigationRowProps {

    isModalWhereCreateNewBrigade: boolean;
    setIsModalWhereCreateNewBrigade: (isCreateModal: boolean) => void;
    isLoadingCreateNewBrigade: boolean;

    isModalWhereDeleteBrigade: boolean;
    setIsModalWhereDeleteBrigade: (isModalWhereDeleteBrigade: boolean) => void;
    isLoadingDeleteBrigade: boolean;

    brigadeList: {
        id:string,
        numberBrigade:number,
        isFull: boolean;
    }[];

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];
    
    setIsBrigadeIdDelete: Dispatch<SetStateAction<string | null>>;

    isbrigadeSelectId: string;
    setIsBrigadeSelectId: (brigadeClick: string) => void;

    setIsCreateNewBrigade: Dispatch<SetStateAction<{
        cycleStartDate: string;
        numberBrigade: number;
    } | null>>

}