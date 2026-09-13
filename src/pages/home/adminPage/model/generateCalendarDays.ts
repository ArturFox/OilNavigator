import type { SortShift } from "../../../../entities/shifts/types/shifts.dto";
import type { DayItem } from "../types/dayItem.type";

interface Props {
    shiftsMap: Map<string, SortShift[]>;
    stringRealDateToday: string;
}

export function generateCalendarDays({
    shiftsMap,
    stringRealDateToday
}: Props): DayItem[] {

    return [...shiftsMap.entries()].map(

        ([stringDate, shiftsForDay]) => {

            const [, , day] = stringDate.split('-').map(Number);

            const isFutureDate: boolean = stringDate > stringRealDateToday;
            const isPastDate: boolean = stringDate < stringRealDateToday;  
            const isToday = stringDate === stringRealDateToday; 

            const checkRealMonth: boolean =
                stringRealDateToday.split('-')[1] === stringDate.split('-')[1] &&
                stringRealDateToday.split('-')[0] === stringDate.split('-')[0];

            const whoWorkOnThisDay = shiftsForDay.filter(
                (s) =>  s.code !== 'О' && s.code !== 'O'
            );

            const hasRedAlarm = whoWorkOnThisDay.some(
                (shift) => shift.hasRedAlarm
            );

            const hasYellowAlarm = whoWorkOnThisDay.some(
                (shift) => shift.hasYellowAlarm
            );

            return {
                day,
                weekDay: whoWorkOnThisDay[0]?.weekday ?? '',
                stringDate,
                hasRedAlarm,
                hasYellowAlarm,
                checkRealMonth,
                isFutureDate,
                isPastDate,
                isToday
            };
        }
    );
}