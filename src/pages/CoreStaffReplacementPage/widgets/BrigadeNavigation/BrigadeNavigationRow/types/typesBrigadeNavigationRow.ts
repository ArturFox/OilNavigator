import type { Dispatch, SetStateAction } from "react";

export interface BrigadeNavigationRowProps {

    // хук useSwipe
    isbrigadeSelectId: string;
    setIsBrigadeSelectId: (brigadeClick: string) => void;

    // хук useBrigadeCreate
    isModalWhereCreateNewBrigade: boolean;
    setIsModalWhereCreateNewBrigade: (isCreateModal: boolean) => void;
    isLoadingCreateNewBrigade: boolean;
    setIsCreateNewBrigade: Dispatch<SetStateAction<{
        cycleStartDate: string;
        numberBrigade: number;
    } | null>>

    // хук useBrigadeDelete
    isModalWhereDeleteBrigade: boolean;
    setIsModalWhereDeleteBrigade: (isModalWhereDeleteBrigade: boolean) => void;
    isLoadingDeleteBrigade: boolean;
    setIsBrigadeIdDelete: Dispatch<SetStateAction<string | null>>;

    // Нужен чтобы отображать в модалках список бригад
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];
    
    // Для отображения списка бригад
    brigadeList: {
        id:string,
        numberBrigade:number,
        isFull: boolean;
    }[];

}