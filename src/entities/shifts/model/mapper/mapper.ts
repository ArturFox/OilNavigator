import type { Shift, ShiftDto } from "../../types/shifts.dto";

export function mappperShifts (shift: ShiftDto): Shift {
    
    return {

        id: shift.id,
        brigade_id: shift.brigade_id,
        day_index: shift.day_index,
        start_time: shift.start_time,
        end_time: shift.end_time,
        label: shift.label,
        code: shift.code,

    }

};