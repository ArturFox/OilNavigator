import { createSelector } from "@reduxjs/toolkit";
import { getBrigadeApi } from "../../api/getBrigades";
import type { Brigade, BrigadesDto } from "../../types/brigades.dto";
import { mapperBrigades } from "../mapper";

export const brigadesMapper = createSelector(

  getBrigadeApi.endpoints.getBrigades.select(),

  (result): Brigade[] => {

    const brigades = result.data?.map((brigade) => mapperBrigades(brigade)) ?? [];

    return brigades;

  }
)

export const brigadesSortArr = createSelector(

  brigadesMapper,

  (result): Brigade[] => {

    const brigadesSortArr = [...(result ?? [])].sort((a,b) => a.number_brigade - b.number_brigade);

    return brigadesSortArr;

  }

)

export const brigadesMap = createSelector(
  getBrigadeApi.endpoints.getBrigades.select(),
  (brigades) => {

    const sortBrigades = [...(brigades.data ?? [])].sort((a, b) => a.number_brigade - b.number_brigade);

    const map = new Map<string, BrigadesDto>();

    sortBrigades?.forEach((f) => {

      if(!map.has(f.id)){
        map.set(f.id, f)
      }

    })

    return map;
  }
)

export const selectFirstInstallationId = createSelector(
  brigadesMap,
  (map) => {
    const first = map.values().next().value;
    return first?.installation_id ?? null;
  }
);