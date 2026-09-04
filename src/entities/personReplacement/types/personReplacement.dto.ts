export interface PersonReplacementDto {
    id: string;
    date: string;
    person_id: string;
    replacement_person_id: string;
    created_at: string;
}

export interface PersonReplacementMapper {
    id: string;
    date: string;
    personId: string;
    replacementPersonId: string;
    createdAt: string;
}