import type { Brigade, BrigadesDto } from "../types/brigades.dto";

export function mapperBrigades (brigade: BrigadesDto): Brigade {

    return {

        id: brigade.id,
        name: brigade.name,
        cycle_start_date: brigade.cycle_start_date,
        installation_id: brigade.installation_id,
        number_brigade: brigade.number_brigade,

    }
}