import { useMemo } from "react";
import type { Persons, PersonsWithStatus } from "../../../../entities/persons/types/persons.dto";

interface Props {
    people: Persons[], 
    isFutureDate: boolean,
    dateStore: string;
}

export function useCheckPersonStatus({ people, isFutureDate, dateStore }: Props ): PersonsWithStatus[] {
    
    const peopleWithStatus = useMemo(() => {
  
        if (!isFutureDate) {
            return people.map((person) => ({
                ...person,
                redAlarm: [],
                yellowAlarm: [],
            }));
        }

        const today = new Date(dateStore);

        const sevenDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        );

        const stringSevenDays = `${sevenDays.getFullYear()}-${String(sevenDays.getMonth() + 1).padStart(2, "0")}-${String(sevenDays.getDate()).padStart(2, "0")}`;

        return people.map((person) => {
            
            const redAlarm: string[] = [];
            const yellowAlarm: string[] = [];

            if (
                person.vacation_start && 
                person.vacation_end && 
                dateStore >= person.vacation_start && 
                dateStore <= person.vacation_end
            ) {
                redAlarm.push("Отпуск");
            }

            if (
                person.sick_start && 
                person.sick_end && 
                dateStore >= person.sick_start && 
                dateStore <= person.sick_end
            ) {
                redAlarm.push("Больничный");
            }

            if(
                person.study_start && 
                person.study_end && 
                dateStore >= person.study_start && 
                dateStore <= person.study_end
            ) {
                redAlarm.push('Обучение');
            }

            if (
                person.vacation_start && 
                person.vacation_start > dateStore && 
                person.vacation_start <= stringSevenDays
            ) {
                yellowAlarm.push("Скоро отпуск");
            }

            if (
                person.study_start && 
                person.study_start > dateStore && 
                person.study_start <= stringSevenDays 
            ) {
                yellowAlarm.push("Скоро обучение");
            }

            return { ...person, redAlarm, yellowAlarm };
        });

    }, [people, dateStore, isFutureDate]);

    return peopleWithStatus;
}