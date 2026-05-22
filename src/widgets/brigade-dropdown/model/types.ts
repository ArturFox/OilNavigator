import type { PersonsDto } from "../../../api/persons/persons.dto";

export interface PersonStatuses {
  redAlarm: string[];
  yellowAlarm: string[];
  birthdayStatus: string[];
}

export type PersonWithStatus = PersonsDto & PersonStatuses;