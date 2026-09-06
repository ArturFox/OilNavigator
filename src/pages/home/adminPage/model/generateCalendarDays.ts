import type { SortShift } from "../../../../entities/shifts/types/shifts.dto";
import type { DayItem } from "../types/dayItem.type";

interface Props {
    year: number,
    month: number,
    daysMonth: number,
    shifts: Map<string, SortShift[]>,
    stringRealDateToday: string,
}

export function generateCalendarDays ({ 
    year, 
    month, 
    daysMonth, 
    shifts, 
    stringRealDateToday
}: Props): DayItem[] {

    return Array.from({ length: daysMonth }, (_, i) => {

        const dayWeek: Date = new Date(
            year,
            month,
            i + 1
        );

        const sevenDayPlus: Date = new Date(
            dayWeek.getFullYear(),
            dayWeek.getMonth(),
            dayWeek.getDate() + 7,
        );

        const weekday: string = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(dayWeek);

        const stringDate: string = `${year}-${String(month+1).padStart(2,'0')}-${String(dayWeek.getDate()).padStart(2,'0')}`;
        const stringDateSeven: string = `${sevenDayPlus.getFullYear()}-${String(sevenDayPlus.getMonth()+1).padStart(2,'0')}-${String(sevenDayPlus.getDate()).padStart(2,'0')}`; 

        const checkRealMonth: boolean = stringRealDateToday.split('-')[1] === stringDate.split('-')[1];

        const shiftsForDay = shifts.get(stringDate) ?? [];
        const activeShifts = shiftsForDay.filter(f => f.code !== 'О');

        const isFutureOrToday: boolean = stringDate >= stringRealDateToday;

        const hasProblem: boolean = isFutureOrToday && (
            
            activeShifts.some( (shift) => {

                const people = shift.peopleOnThisDay ?? [];

                // если в бригаде меньше 7 человек, то это true
                // и помечаем hasProblem как true что есть ошибка
                const notHuman: boolean = people.length < 7;

                if(notHuman){
                    return true
                }

                return people.some( (person) => {

                    const inVacation: boolean = Boolean(
                        person.vacation_start &&
                        person.vacation_end &&
                        stringDate >= person.vacation_start &&
                        stringDate <= person.vacation_end 
                    );

                    const inSick: boolean = Boolean(
                        person.sick_start &&
                        person.sick_end &&
                        stringDate >= person.sick_start &&
                        stringDate <= person.sick_end
                    );

                    const inStudy: boolean = Boolean(
                        person.study_start &&
                        person.study_end &&
                        stringDate >= person.study_start &&
                        stringDate <= person.study_end
                    );

                    return inVacation || inSick || inStudy;
                });

            })
        )

        const soonVacation: boolean = isFutureOrToday && (
            
            activeShifts.some((shift) => {

                const people = shift.peopleOnThisDay ?? [];

                return people.some( (person) => {               

                    const vacationSoon: boolean = Boolean(
                        person.vacation_start &&
                        person.vacation_start > stringDate &&
                        person.vacation_start <= stringDateSeven
                    );

                    const studySoon: boolean = Boolean (
                        person.study_start &&
                        person.study_start > stringDate &&
                        person.study_start <= stringDateSeven
                    )

                    return vacationSoon || studySoon
                })
            })
        )

        return {
            day: i + 1,
            weekDay: weekday,
            stringDate,
            hasProblem,
            soonVacation,
            checkRealMonth,
        };
    });

} 