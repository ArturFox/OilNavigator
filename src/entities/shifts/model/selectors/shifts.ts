//src/mock/shifts.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { getShiftsApi } from "../../api/getShifts";
import { mappperShifts } from "../mapper/mapper";


export const shiftsMapper = createSelector(

  getShiftsApi.endpoints.getShifts.select(),

  (result) => {

    const shifts = result.data?.map((shift) => mappperShifts(shift)) ?? [];

    return shifts;

  }

)