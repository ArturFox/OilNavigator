//src/types/shifts.dto.ts

import type { Brigade } from "../../brigades/types/brigades.dto";
import type { PersonsWithStatus } from "../../persons/types/persons.dto";

export interface ShiftDto {
    id: string;
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string
}

export interface Shift {
    id: string;
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string
}

export interface AddShiftDto {
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string
}

export interface SortShift {
    id: string,

    brigade: Brigade, 

    code: string, 
    label: string,

    startDate: string,
    
    russianDate: string, 

    startTime: string | null, 
    endTime: string | null,

    peopleOnThisDay: PersonsWithStatus[],

    isFutureDate: boolean,
    notHuman: boolean,
    howManyNotHuman: number
}