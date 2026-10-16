import { brigadesMapper } from "@/entities/brigades/model/selectors/mapperBrigades";
import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import { shiftsMapper } from "@/entities/shifts/model/selector/selectorShifts";
import type { Shift } from "@/entities/shifts/types/shifts.dto";
import { createSelector } from "@reduxjs/toolkit";


export const uniqueObjectArrAdminScheduleChange = createSelector(

    shiftsMapper,

    (shifts): Shift[] => {

        const uniqueTimes = new Set<string>();

        const uniqueObject: Shift[] = [];

        shifts.forEach((shift) => {

            const key: string = `${shift.start_time}-${shift.end_time}`;

            if (!uniqueTimes.has(key)) {

                uniqueTimes.add(key);

                uniqueObject.push(shift);

            }

        });

        return uniqueObject;
    }
);

export const uniqueObjectArrSortAdminScheduleChang = createSelector(

    uniqueObjectArrAdminScheduleChange,

    (shifts): Shift[] => {

        const sortShifts = [...shifts].sort((a, b) => {

            return (a.start_time ?? '').localeCompare(b.start_time ?? '');

        });

        return sortShifts;
    } 
)

export const brigadesArrAdminScheduleChange = createSelector(

    brigadesMapper,

    (brigades): Brigade[] => {

        return [...brigades].sort( (a,b) => a.number_brigade - b.number_brigade );

    }

);