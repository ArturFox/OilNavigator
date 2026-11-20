import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import type { Persons } from "@/entities/persons/types/persons.dto";
import type { Dispatch, SetStateAction } from "react";

export interface BrigadeWorkersSliderProps {

    // хук useSwipe
    currentIndex: number;
    dragOffset: number;
    isDragging: boolean;
    handleTouchStart: (event: React.TouchEvent<HTMLElement>) => void;
    handleTouchMove: (event: React.TouchEvent<HTMLElement>) => void;
    handleTouchEnd: () => void;

    // хук useManageSeveralWorkItemCards
    isButtonSelectCheck: boolean;

    listSelectedUsers: string[];
    setListSelectedUsers: Dispatch<SetStateAction<string[]>>;

    isOpenModalSeveral: boolean;
    setIsOpenModalSeveral: (isOpenModalSeveral: boolean) => void;

    setIsApplymodalReplaceSeveral: Dispatch<SetStateAction<string | null>>

    // хук useManageOnlyOneWorkItemCards
    setIsApplymodalReplaceOnlyOne: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;

    // хук useRedirectEmptyCard
    isShouldRedirect: boolean;
    setIsShouldRedirect: Dispatch<SetStateAction<boolean>>;
    setTargetBrigadeId: Dispatch<SetStateAction<string | null>>;

    // Передаем массив бригад, по которому формируются слайды 
    // и распределяются сотрудники в соответствии с их brigade_id
    brigadeSortArr: Brigade[];

    // Передаём сотрудников, распределённых по своим бригадам (ключ — ID бригады)
    peopleMap: Map<string, Persons[]>;

    // Нужен чтобы отображать в модалках список бригад
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    // Для отображания в ModalReplaceSeveralSelect списка выбранных людей
    arrSelectButton: {
        id: string;
        name: string;
        surname: string;
    }[];
}