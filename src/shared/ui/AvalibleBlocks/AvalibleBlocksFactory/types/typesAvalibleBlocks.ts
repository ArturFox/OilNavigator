import type { Persons } from "@/entities/persons/types/persons.dto";

export interface AvalibleBlocksWithObjectPersonProps {
    he_can: string[] | null;
    personToReplace: Persons | null;
}

export interface AvalibleBlocksBaseProps {
    he_can: string[] | null;
}