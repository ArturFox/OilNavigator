//src/api/brigades/brigades.dto.ts

export interface BrigadesDto {
    id: string;
    name: string;
    cycle_start_date: string | null;
    installation_id: string;
    number_brigade: number;
}

export type  CreateBrigadeDto = {
    name: string;
    installation_id: string;
    number_brigade: number;
}

export interface Brigade {
    id: string;
    name: string;
    cycle_start_date: string | null;
    installation_id: string;
    number_brigade: number;
}