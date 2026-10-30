import type { Persons } from "../../entities/persons/types/persons.dto";

export function useCheckPersonStatus(
  people: Persons[], 
  stringDate: string,
): Persons[] {
    
  const today = new Date(stringDate);

  const sevenDays = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  const stringSevenDays = `${sevenDays.getFullYear()}-${String(sevenDays.getMonth() + 1).padStart(2, "0")}-${String(sevenDays.getDate()).padStart(2, "0")}`;

    return people.map((person) => {

        if (
            person.vacation_start && 
            person.vacation_end && 
            stringDate >= person.vacation_start && 
            stringDate <= person.vacation_end
        ) {
            person.redAlarm.push("Отпуск");
        }

        if (
            person.sick_start && 
            person.sick_end && 
            stringDate >= person.sick_start && 
            stringDate <= person.sick_end
        ) {
            person.redAlarm.push("Больничный");
        }

        if(
            person.study_start && 
            person.study_end && 
            stringDate >= person.study_start && 
            stringDate <= person.study_end
        ) {
            person.redAlarm.push('Обучение');
        }

        if (
            person.vacation_start && 
            person.vacation_start > stringDate && 
            person.vacation_start <= stringSevenDays
        ) {
            person.yellowAlarm.push("Скоро отпуск");
        }

        if (
            person.study_start && 
            person.study_start > stringDate && 
            person.study_start <= stringSevenDays 
        ) {
            person.yellowAlarm.push("Скоро обучение");
        }

        return { ...person };
    });
}