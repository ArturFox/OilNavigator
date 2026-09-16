import { ShiftConstructor } from "../../widgets/ShiftConstructor/ui/ShiftConstructor";
import { ShiftTimeEditor } from "../../widgets/ShiftTimeEditor/ui/ShiftTimeEditor";
import { BrigadeChange } from "./widgets/BrigadeChange/BrigadeChange";
import { useGetBrigadesQuery } from "../../entities/brigades/api/getBrigades";
import type { BrigadesDto } from "../../entities/brigades/types/brigades.dto";
import { useGetPesonsQuery } from "../../entities/persons/api/getPersons";

import {
    EVENING,
    MORNING,
    NIGHT,
    type DataType,
    type DayOffType
} from "../../shared/constants/shifts";

export {
    ShiftConstructor,
    ShiftTimeEditor,
    BrigadeChange,
    useGetBrigadesQuery,
    useGetPesonsQuery,
    EVENING,
    MORNING,
    NIGHT,
};

export type {
    BrigadesDto,
    DataType,
    DayOffType,
};