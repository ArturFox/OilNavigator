import type { DefaultScheduleTemplates, DefaultScheduleTemplatesDto } from "../../types/defaultScheduleTemplates.dto";

export function mapperDefaultScheduleTemplates (
    defaultScheduleTemplates: DefaultScheduleTemplatesDto

): DefaultScheduleTemplates {

    return {
        id: defaultScheduleTemplates.id,
        label: defaultScheduleTemplates.label,
        code: defaultScheduleTemplates.code,
        colorBg: defaultScheduleTemplates.color_bg,
        timeStart: defaultScheduleTemplates.time_start,
        timeEnd: defaultScheduleTemplates.time_end,
        sum: defaultScheduleTemplates.sum,
    }
    
}