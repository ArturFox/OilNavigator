export interface DataType {
  start_time: string, 
  end_time: string, 
  label: string, 
  code: string
  color: string
  id: string
}

export interface DayOffType {
  start_time: null, 
  end_time: null, 
  label: string, 
  code: string,
  color: string,
  id: string
}

export const MORNING: DataType = { 
    start_time: "08:00", 
    end_time: "16:00", 
    label: "Утро", 
    code: 'У',
    color: '#f59e0b',
    id: crypto.randomUUID()
};

export const EVENING: DataType = { 
    start_time: "16:00", 
    end_time: "00:00", 
    label: "Вечер", 
    code: 'В',
    color: '#a21caf',
    id: crypto.randomUUID(),
};

export const NIGHT: DataType = { 
    start_time: "00:00", 
    end_time: "08:00", 
    label: "Ночь", 
    code: 'Н',
    color: '#38bdf8',
    id: crypto.randomUUID()
};

export const DAYOFF: DayOffType = { 
    start_time: null, 
    end_time: null, 
    label: "Отдых", 
    code: 'О',
    color: '#f5deb3',
    id: crypto.randomUUID()
};