import type { Brigade } from "../../../entities/brigades/types/brigades.dto";
import type { PersonsWithStatus } from "../../../entities/persons/types/persons.dto";

export interface FilterSelected {
    brigadesId: string[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

export interface SelectedPerson {
    personObj: PersonsWithStatus | null;
    brigade: Brigade | null;
}