import type { Persons, PersonsDto } from "../../types/persons.dto";

export function mappperPerson(person: PersonsDto): Persons {

    return {
        id: person.id,
        name: person.name,
        surname: person.surname,
        other_surname: person.other_surname,
        brigade_id: person.brigade_id,
        discharge: person.discharge,
        block: person.block,
        job_title: person.job_title,   
        phone_number: person.phone_number,
        birthday: person.birthday,
        vacation_start: person.vacation_start,
        vacation_end: person.vacation_end,
        he_can: person.he_can,
        sick_start: person.sick_start,
        sick_end: person.sick_end,
        brigade_name: person.brigade_name,
        study_start: person.sick_start,
        study_end: person.study_end,
        installation_id: person.installation_id,
        role: person.role,
    };
}