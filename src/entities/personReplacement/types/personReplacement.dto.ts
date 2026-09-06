export interface PersonReplacementDto {
    id: string;
    date: string;
    person_id: string;
    replacement_person_id: string;
    created_at: string;
    replacement_brigade_id: string
    person_brigade_id: string;
}

export interface PersonReplacementMapper {
    id: string;
    date: string;
    personId: string;
    replacementPersonId: string;
    createdAt: string;
    replacement_brigade_id: string;
    person_brigade_id: string;
}