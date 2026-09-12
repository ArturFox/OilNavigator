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

            const checkRealMonth =
                stringRealDateToday.split('-')[1] === stringDate.split('-')[1];

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
            };
        }
    );
}