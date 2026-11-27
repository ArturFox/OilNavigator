import type { Dispatch, SetStateAction } from "react";

export interface BaseFilters {
    brigadesId: (string | null)[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

export interface ModalWorkerFilterProps<T extends BaseFilters> {

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    apply: () => void;
    reset: () => void;

    brigades: {
        id: string;
        name: string;
    }[];
    jobTitles: string[];
    blocks: string[];
    discharges: number[];
}