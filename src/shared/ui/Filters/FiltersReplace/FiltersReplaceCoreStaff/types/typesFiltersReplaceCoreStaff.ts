import type { Dispatch, SetStateAction } from "react";

export interface BaseFilters {
    brigadesId: (string | null)[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

export interface FilterReplaceCoreStaffProps<T extends BaseFilters> {

    isOpenModalFilterReplaceCoreStaff: boolean;
    setIsOpenModalFilterReplaceCoreStaff: (isOpenModalFilterReplaceCoreStaff: boolean) => void;

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    brigades: {
        id: string;
        name: string;
    }[];
    jobTitles: string[];
    blocks: string[];
    discharges: number[];

    apply: () => void;
    reset: () => void;

}