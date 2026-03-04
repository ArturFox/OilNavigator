export interface PersonsDto {
    id: string;
    name: string;
    surname: string;
    other_surname: string;
    discharge: number;              
    brigade_id: string | null;       
    block: string | null;
    job_title: string;
    phone_number: string;
    birthday: string | null;
    vacation_start: string | null;
    vacation_end: string | null;
    he_can: string[] | null;
    sick_start: string | null;
    sick_end: string | null;
    brigade_name: string
}