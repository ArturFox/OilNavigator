import type { PersonsDto } from "../../../../api/persons/persons.dto";
import type { SortShift } from "../../../../api/shifts/shifts.dto";
import type { DayItem } from "../types";


interface Props {
    year: number,
    month: number,
    daysMonth: number,
    shiftsMapProps: Map<string, SortShift[]>,
    personsMapProps: Map<string, PersonsDto[]>
}

export function generateCalendarDays ({ year, month, daysMonth, shiftsMapProps, personsMapProps}: Props): DayItem[] {

    const realDay: Date = new Date();
    const stringRealDate: string = `${realDay.getFullYear()}-${String(realDay.getMonth()+1).padStart(2,'0')}-${String(realDay.getDate()).padStart(2,'0')}`;

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

        const shiftsForDay = shiftsMapProps.get(stringDate) ?? [];
        const activeShifts = shiftsForDay.filter(f => f.code !== 'О');

        const isFutureOrToday = stringDate >= stringRealDate;

        const hasProblem = isFutureOrToday && (
            
            activeShifts.some(shift => {

                const people = personsMapProps.get(shift.brigadeId) ?? [];

                return people.some(person => {

                    const inVacation =
                        person.vacation_start &&
                        person.vacation_end &&
                        stringDate >= person.vacation_start &&
                        stringDate <= person.vacation_end;

                    const inSick =
                        person.sick_start &&
                        person.sick_end &&
                        stringDate >= person.sick_start &&
                        stringDate <= person.sick_end;

                    const inStudy = 
                        person.study_start &&
                        person.study_end &&
                        stringDate >= person.study_start &&
                        stringDate <= person.study_end

                    return inVacation || inSick || inStudy;
                });

            })
        )

        const soonVacation = isFutureOrToday && (
            
            activeShifts.some(shift => {

                const people = personsMapProps.get(shift.brigadeId) ?? [];

                return people.some(person => {               

                    const vacationSoon = 
                        person.vacation_start &&
                        person.vacation_start > stringDate &&
                        person.vacation_start <= stringDateSeven;

                    const studySoon = 
                        person.study_start &&
                        person.study_start > stringDate &&
                        person.study_start <= stringDateSeven;

                    return vacationSoon || studySoon
                })
            })
        )

        return {
            day: i + 1,
            weekDay: weekday,
            stringDate,
            hasProblem,
            soonVacation
        };
    });

}