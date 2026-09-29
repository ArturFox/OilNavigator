import { createSelector } from "@reduxjs/toolkit";
import { shiftsMapper } from "../../../entities/shifts/model/selectors/shifts";
import type { Shift } from "../../../entities/shifts/types/shifts.dto";

export const uniqueObjectArrAdminScheduleChange = createSelector(

    shiftsMapper,

    (shifts) => {

        const uniqueObject: Shift[] = [];

        shifts.forEach((shift) => {

            const alreadyExists: boolean = uniqueObject.some(
                (item) => {

                    const startTime: boolean = item.start_time === shift.start_time;
                    const endTime: boolean = item.end_time === shift.end_time;

                    return startTime && endTime;
                }
            );

            if(!alreadyExists) {
                uniqueObject.push(shift);
            }

        });
        
        return uniqueObject;

    }

);