import type { Persons, PersonsWithStatus } from "../../entities/persons/types/persons.dto";

export function useCheckPersonStatus(
  people: Persons[], 
  stringDate: string,
): PersonsWithStatus[] {
    
  const today = new Date(stringDate);

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
            stringDate >= person.vacation_start && 
            stringDate <= person.vacation_end
        ) {
            redAlarm.push("Отпуск");
        }

        if (
            person.sick_start && 
            person.sick_end && 
            stringDate >= person.sick_start && 
            stringDate <= person.sick_end
        ) {
            redAlarm.push("Больничный");
        }

        if(
            person.study_start && 
            person.study_end && 
            stringDate >= person.study_start && 
            stringDate <= person.study_end
        ) {
            redAlarm.push('Обучение');
        }

        if (
            person.vacation_start && 
            person.vacation_start > stringDate && 
            person.vacation_start <= stringSevenDays
        ) {
            yellowAlarm.push("Скоро отпуск");
        }

        if (
            person.study_start && 
            person.study_start > stringDate && 
            person.study_start <= stringSevenDays 
        ) {
            yellowAlarm.push("Скоро обучение");
        }

        return { ...person, redAlarm, yellowAlarm };
    });
}