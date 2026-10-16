import { createSelector } from "@reduxjs/toolkit";
import { mapperDefaultScheduleTemplates } from "../mapper/mapperDefaultScheduleTemplates";
import type { DefaultScheduleTemplates } from "../../types/defaultScheduleTemplates.dto";
import { getDefaultScheduleTemplatesApi } from "../../api/getDefaultScheduleTemplates";

export const defaultScheduleTemplatesMapper = createSelector(

  getDefaultScheduleTemplatesApi.endpoints.getDefaultScheduleTemplates.select(),

  (result): DefaultScheduleTemplates[] => {

    const shifts = result.data?.map((shift) => mapperDefaultScheduleTemplates(shift)) ?? [];

    return shifts;

  }
)

export const defaultScheduleTemplatesArr = createSelector(

    defaultScheduleTemplatesMapper,

    (schedule): DefaultScheduleTemplates[] => {

        const sortSchedule = [...schedule].sort((a,b) => a.sum - b.sum);

        console.log(sortSchedule)

        return sortSchedule;

    }

)