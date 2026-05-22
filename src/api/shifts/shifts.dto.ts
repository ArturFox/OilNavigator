//src/types/shifts.dto.ts

export interface ShiftDto {
    id: string;
    brigade_id: string;
    day_index: number;
    start_time: string | null;
    end_time: string | null;
    label: string;
    code: string
}

export interface SortShift {
    id: string,

    brigadeId: string, 

    code: string, 
    label: string,

    startDate: string,
    
    russianDate: string, 

    startTime: string | null, 
    endTime: string | null,
}