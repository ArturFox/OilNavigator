export interface PersonsDto {
    id: string;
    name: string;
    surname: string;
    other_surname: string;
    role: 'admin' | 'user';
    installation_id: string;
    discharge: number;      
    block: string;
    job_title: string;
    brigade_id: string | null;       
    phone_number: string | null;
    birthday: string | null;
    vacation_start: string | null;
    vacation_end: string | null;
    he_can: string[] | null;
    sick_start: string | null;
    sick_end: string | null;
    brigade_name: string
    study_start: string | null;
    study_end: string | null;
    
}

export interface Persons {
    id: string;
    name: string;
    surname: string;
    other_surname: string;
    role: 'admin' | 'user';
    installation_id: string;
    discharge: number;      
    block: string;
    job_title: string;
    brigade_id: string | null;       
    phone_number: string | null;
    birthday: string | null;
    vacation_start: string | null;
    vacation_end: string | null;
    he_can: string[] | null;
    sick_start: string | null;
    sick_end: string | null;
    brigade_name: string
    study_start: string | null;
    study_end: string | null;
}

interface PersonsStatus {
  redAlarm: string[];
  yellowAlarm: string[];
}

export type PersonsWithStatus = Persons & PersonsStatus;