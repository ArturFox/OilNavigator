//src/types/shifts.dto.ts

import type { Brigade } from "../../brigades/types/brigades.dto";
import type { Persons } from "../../persons/types/persons.dto";

export interface ShiftDto {
    id: string;
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string;
    color: string;
}

export interface Shift {
    id: string;
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string;
    color: string;
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
    id: string;

    brigade: Brigade; 

    peopleOnThisDay: Persons[];

    code: string;
    label: string;

    date: string;
    
    russianDate: string;

    startTime: string | null;
    endTime: string | null;

    isFutureDate: boolean;
    isPastDate: boolean;
    isToday: boolean;

    notHuman: boolean;
    howManyNotHuman: number;

    weekday: string;

    hasRedAlarm: boolean,
    hasYellowAlarm: boolean,

    color: string;
}

export interface SortShiftDay {

    date: string;

    shifts: SortShift[];

    personsWithoutBrigade: Persons[];

    personsRemovedFromBrigade: Persons[];
    
}