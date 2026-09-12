export interface PersonReplacementDto {
    id: string;
    date: string;
    created_at: string;

    person_who_was_replaced_id: string | null;
    person_who_was_replaced_brigade_id: string;

    person_replaced_id: string
    person_replaced_brigade_id: string | null;
}

export interface PersonReplacementMapper {
    id: string;
    date: string;
    created_at: string;

    personWhoWasReplacedId: string | null;
    personWhoWasReplacedBrigadeId: string;

    personReplacedId: string;
    personReplacedBrigadeId: string | null;
}