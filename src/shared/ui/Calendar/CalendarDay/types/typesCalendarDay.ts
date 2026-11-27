export interface CalendarDayProps {
    weekDay: string;
    checkRealMonth: boolean;
    stringDate: string;
    isFutureDate: boolean;
    isPastDate: boolean;
    isToday: boolean; 
    day: number;
    hasRedAlarm: boolean;
    hasYellowAlarm: boolean;

    dateStore: string;
    stringRealDateToday: string;

    selectedDateRef: React.RefObject<HTMLSpanElement | null>;

    isUserSelectDate: string;

    selectDate: (stringDate: string) => void;
}
