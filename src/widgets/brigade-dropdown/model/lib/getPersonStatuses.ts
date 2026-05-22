import type { PersonsDto } from "../../../../api/persons/persons.dto";
import type { PersonWithStatus } from "../types";

export function getPersonStatuses(people: PersonsDto[], stringDate: string): PersonWithStatus[] {
    
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
      const birthdayStatus: string[] = [];

      if (person.vacation_start && person.vacation_end && stringDate >= person.vacation_start && stringDate <= person.vacation_end) {
        redAlarm.push("В отпуске");
      }

      if (person.sick_start && person.sick_end && stringDate >= person.sick_start && stringDate <= person.sick_end) {
        redAlarm.push("Больничный");
      }

      if(person.study_start && person.study_end && stringDate >= person.study_start && stringDate <= person.study_end) {
        redAlarm.push('На обучении');
      }

      if (person.vacation_start && person.vacation_start > stringDate && person.vacation_start <= stringSevenDays) {
        yellowAlarm.push("Приближается отпуск");
      }

      if (person.study_start && person.study_start > stringDate && person.study_start <= stringSevenDays ) {
        yellowAlarm.push("Приближается обучение");
      }
      if (person.birthday && person.birthday === stringDate) {
        birthdayStatus.push("День рождения");
      }

      return { ...person, redAlarm, yellowAlarm, birthdayStatus };
    });
}