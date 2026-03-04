//src/api/brigades/brigades.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { getBrigadeApi } from "./brigades.api";
import type { BrigadesDto } from "./brigades.dto";

const brigadesSelector = getBrigadeApi.endpoints.getBrigades.select();

export const brigades = createSelector(
  brigadesSelector,
  (brigades) => {

    const map = new Map<string, BrigadesDto>();

    brigades.data?.forEach((f) => {

      if(!map.has(f.id)){
        map.set(f.id, f)
      }

    })

    return map;
  }
)