import type { PersonReplacementDto, PersonReplacementMapper } from "../../types/personReplacement.dto";

export function mappperPersonReplacement (personReplacement: PersonReplacementDto): PersonReplacementMapper {
    
    return {
        id: personReplacement.id,
        date: personReplacement.date,
        personId: personReplacement.person_id,
        replacementPersonId: personReplacement.replacement_person_id,
        createdAt: personReplacement.created_at,
        replacement_brigade_id: personReplacement.replacement_brigade_id,
        person_brigade_id: personReplacement.person_brigade_id,
    }

}