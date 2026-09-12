import type { PersonReplacementDto, PersonReplacementMapper } from "../../types/personReplacement.dto";

export function mappperPersonReplacement (personReplacement: PersonReplacementDto): PersonReplacementMapper {
    
    return {
        id: personReplacement.id,
        date: personReplacement.date,
        created_at: personReplacement.created_at,

        personWhoWasReplacedId: personReplacement.person_who_was_replaced_id,
        personWhoWasReplacedBrigadeId: personReplacement.person_who_was_replaced_brigade_id,

        personReplacedId: personReplacement.person_replaced_id,
        personReplacedBrigadeId: personReplacement.person_replaced_brigade_id
    }

}