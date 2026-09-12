import { createSelector } from "@reduxjs/toolkit";
import { brigadesMapper } from "../../../../entities/brigades/model/selectors/brigades";
import type { Brigade } from "../../../../entities/brigades/types/brigades.dto";
import type { RootState } from "../../../../app/store/store";
import { personsMapper } from "../../../../entities/persons/model/selectors/persons";
import type { Persons, PersonsWithStatus } from "../../../../entities/persons/types/persons.dto";
import { shiftsMapper } from "../../../../entities/shifts/model/selectors/shifts";
import type { Shift, SortShift } from "../../../../entities/shifts/types/shifts.dto";
import { personsReplacementMapper } from "../../../../entities/personReplacement/model/selectors/personReplacement";

export const brigadesArr = createSelector(
  
  brigadesMapper,

  (brigades): Brigade[] => {

    const sortBrigades = [...(brigades ?? [])].sort((a, b) => a.number_brigade - b.number_brigade);

    return sortBrigades;

  }

)

export const personsMap = createSelector(
    
    personsMapper,

    (persons): Map<string, Persons[]>  => {

        const arrSort = [...persons].sort((a, b) => (
            b.discharge - a.discharge
        ));

        const map = new Map<string, Persons[]>();

        arrSort.forEach((person) => {

            const key = person.brigade_id ?? 'no_brigade';

            if (!map.has(key)) {

                map.set(key, []);

            }

            map.get(key)!.push(person);
        })

        return map;
    }
)

export const shiftMap = createSelector(

  shiftsMapper,

  (shifts) => {

    const map = new Map<string, Shift[]>();

    shifts.forEach((s) => {

      if(!map.has(s.brigade_id)){

        map.set(s.brigade_id, [])

      }

      map.get(s.brigade_id)!.push(s)

    })

    return map;

  }

)

export const personsReplacementArr = createSelector(

    personsReplacementMapper,

    (replacement) => {

        return [...replacement];
    }

)

// чтобы при нажатии на день в календаре того же месяца не происходили вычисления двух следующих селекторов 
// если только пользователь выберит другой месяц, то тогда будет персчет двух следующих селекторов
const dateStore = createSelector(

  (state: RootState) => state.date.day,

  (day) => {
    
    return day.slice(0,7);

  }

);

// это чтобы нормолизовать дату из бд 2026-01-01 
// вызываем toDateKey чтобы получить время 00:00 и все стабильно было 
function toDateKey(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// вычисляем на один месяц расписание для каждой бригады
export const createMonthShift = createSelector(
  
  brigadesArr,
  shiftMap,
  dateStore,
  personsMap,
  personsReplacementArr,

  (brigades, shift, monthSelected, persons, personReplacement): SortShift[] => {

    const result: SortShift[] = [];

    const [year, month] = monthSelected.split("-").map(Number);

    const daysInMonth = new Date(year, month, 0).getDate();

    const todayDate: Date = new Date();

    const sevenPlusDays = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate() + 7
    );

    const todayDateString = `${todayDate.getFullYear()}-${String(todayDate.getMonth()+1).padStart(2,'0')}-${String(todayDate.getDate()).padStart(2,'0')}`;

    const sevenPlusDaysString = `${sevenPlusDays.getFullYear()}-${String(sevenPlusDays.getMonth()+1).padStart(2,'0')}-${String(sevenPlusDays.getDate()).padStart(2,'0')}`;

    brigades.forEach((brigade) => {

      if (!brigade.cycle_start_date) return;

      const baseDate: Date = toDateKey(new Date(brigade.cycle_start_date));

      const brigadePattern = [...(shift.get(brigade.id) ?? [])].sort((a, b) => a.day_index - b.day_index);

      if(brigadePattern.length === 0) return;

      for(let day = 1; day <= daysInMonth; day++){

        const currentDate = new Date(year, month - 1, day);

        const diff = Math.floor(
          (currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diff < 0) continue;

        const template = brigadePattern[diff % brigadePattern.length];

        const normalizedCode = template.code === 'O' ? 'О' : template.code;

        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(currentDate.getDate()).padStart(2,'0')}`;
        const dateRussian = `${String(currentDate.getDate()).padStart(2,'0')}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${currentDate.getFullYear()}`;

        //Обычные люди этой бригады
        let personsOnThisDay: Persons[] =
            [...(persons.get(brigade.id) ?? [])];

        //Замены именно на этот день
        const dayReplacements = personReplacement.filter(

            (replacement) => {
              
              const date = new Date(replacement.date);

              const dateString = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
              
              return (
                dateString === dateKey &&
                replacement.personWhoWasReplacedBrigadeId === brigade.id
              );

            }
        );

        //Убираем тех, кого заменяют
        personsOnThisDay = personsOnThisDay.filter(
          (person) => {
            return !dayReplacements.some(
              (replacement) =>
                replacement.personWhoWasReplacedId !== null &&
                replacement.personWhoWasReplacedId === person.id
            );
          }
        );

        //Добавляем тех, кто заменяет
        dayReplacements.forEach(
          
          (replacement) => {

            const replacementPerson = [...persons.values()]
            .flat()
            .find(
              person =>
                person.id === replacement.personReplacedId
            );

            if (replacementPerson) {
                personsOnThisDay.push(replacementPerson);
            }

          }

        );

        //для отображения цвета
        //если день прошел то серый
        //если сегодняшний или будующий то синий
        const isFutureDate: boolean = todayDateString <= dateKey;
      
        //Если в бригаде меньше 7 человек, то это true
        //и покажем в интерфейсе сколько человек не хваатает 
        const notHuman: boolean = personsOnThisDay.length < 7;
        const howManyNotHuman: number = 7 - personsOnThisDay.length;


        const personsWithStatus: PersonsWithStatus[] = personsOnThisDay.map((person) => {
            
          const redAlarm: string[] = [];
          const yellowAlarm: string[] = [];

          // ПРОБЛЕМЫ НА ЭТОТ ДЕНЬ

          if (
              person.vacation_start && 
              person.vacation_end && 
              dateKey >= person.vacation_start && 
              dateKey <= person.vacation_end
          ) {
              redAlarm.push("Отпуск");
          }

          if (
              person.sick_start && 
              person.sick_end && 
              dateKey >= person.sick_start && 
              dateKey <= person.sick_end
          ) {
              redAlarm.push("Больничный");
          }

          if(
              person.study_start && 
              person.study_end && 
              dateKey >= person.study_start && 
              dateKey <= person.study_end
          ) {
              redAlarm.push('Обучение');
          }

          // СОБЫТИЕ В БЛИЖАЙШИЕ 7 ДНЕЙ

          if (
              person.vacation_start && 
              person.vacation_start > dateKey && 
              person.vacation_start <= sevenPlusDaysString
          ) {
              yellowAlarm.push("Скоро отпуск");
          }

          if (
              person.study_start && 
              person.study_start > dateKey && 
              person.study_start <= sevenPlusDaysString
          ) {
              yellowAlarm.push("Скоро обучение");
          }

          return { ...person, redAlarm, yellowAlarm };
        });

        const weekday: string = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(currentDate);

        const hasRedAlarm: boolean =
            isFutureDate &&
            (
                personsWithStatus.length < 7 ||
                personsWithStatus.some(person => person.redAlarm.length > 0)
            );

        const hasYellowAlarm: boolean =
            isFutureDate &&
            personsWithStatus.some(person => person.yellowAlarm.length > 0);


        result.push({
          id: `${dateKey}-${brigade.id}`,
          brigade: brigade,
          startDate: dateKey,
          code: normalizedCode,
          label: template.label,
          startTime: template.start_time?.slice(0, 5) ?? null,
          endTime: template.end_time?.slice(0, 5) ?? null,
          russianDate: dateRussian,
          peopleOnThisDay: personsWithStatus,
          isFutureDate: isFutureDate,
          notHuman: notHuman,
          howManyNotHuman: howManyNotHuman,
          weekday: weekday,
          hasRedAlarm: hasRedAlarm,
          hasYellowAlarm: hasYellowAlarm,
        });
      }
    })

    return result;

  }

)

// на каждый день отсортировали бригады вначале кто ночью потом утром потом вечером и потом кто отдыхает
export const sortShiftMap = createSelector(

  createMonthShift,

  (shifts): Map<string, SortShift[]> => {

    const sorted = [...shifts].sort((a,b) => {

      if (a.startDate !== b.startDate) {

        return a.startDate.localeCompare(b.startDate);
      
      }

      const order = { "Н": 0, "У": 1, "В": 2, "О": 3 };

      return order[a.code as "Н" | "У" | "В" | "О"] - order[b.code as "Н" | "У" | "В" | "О"];

    });

    const map = new Map<string, SortShift[]>();

    for (const shift of sorted) {

      if (!map.has(shift.startDate)) {

        map.set(shift.startDate, []);
    
      }

      map.get(shift.startDate)!.push(shift);
    }

    return map;

  }

)

export const whoDontHaveBrigade = createSelector(
  personsMap,
  dateStore,

  (persons, monthSelected) => {

    const [year, month] = monthSelected.split("-").map(Number);

    const daysInMonth = new Date(year, month, 0).getDate();

    const todayDate: Date = new Date();

    const todayDateString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

    const sevenPlusDays = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + 7
    );

    const sevenPlusDaysString = `${sevenPlusDays.getFullYear()}-${String(sevenPlusDays.getMonth() + 1).padStart(2, '0')}-${String(sevenPlusDays.getDate()).padStart(2, '0')}`;

    const checkWhoDontHaveBrigade: Persons[] = [...persons.values()]
      .flat()
      .filter((p) => !p.brigade_id);

    const result: SortShift[] = [];

    checkWhoDontHaveBrigade.forEach((person) => {

      for (let day = 1; day <= daysInMonth; day++) {

        const currentDate = new Date(year, month - 1, day);

        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

        const dateRussian = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

        const redAlarm: string[] = [];
        const yellowAlarm: string[] = [];

        if (
          person.vacation_start &&
          person.vacation_end &&
          dateKey >= person.vacation_start &&
          dateKey <= person.vacation_end
        ) {
          redAlarm.push("Отпуск");
        }

        if (
          person.sick_start &&
          person.sick_end &&
          dateKey >= person.sick_start &&
          dateKey <= person.sick_end
        ) {
          redAlarm.push("Больничный");
        }

        if (
          person.study_start &&
          person.study_end &&
          dateKey >= person.study_start &&
          dateKey <= person.study_end
        ) {
          redAlarm.push("Обучение");
        }

        if (
          person.vacation_start &&
          person.vacation_start > dateKey &&
          person.vacation_start <= sevenPlusDaysString
        ) {
          yellowAlarm.push("Скоро отпуск");
        }

        if (
          person.study_start &&
          person.study_start > dateKey &&
          person.study_start <= sevenPlusDaysString
        ) {
          yellowAlarm.push("Скоро обучение");
        }

        const isFutureDate: boolean = todayDateString <= dateKey;

        const weekday: string =
          new Intl.DateTimeFormat('ru-RU', { weekday: 'short' })
            .format(currentDate);

        const hasRedAlarm: boolean =
          isFutureDate && redAlarm.length > 0;

        const hasYellowAlarm: boolean =
          isFutureDate && yellowAlarm.length > 0;

        result.push({
          id: `${dateKey}-${person.id}-no_brigade`,
          brigade: { 
            id: 'no-brigade', 
            name: 'Без бригады', 
            number_brigade: 0, 
            cycle_start_date: null, 
            installation_id: '', 
          },
          code: '',
          label: 'Без бригады',
          startDate: dateKey,
          russianDate: dateRussian,
          startTime: null,
          endTime: null,
          peopleOnThisDay: [
            {
              ...person,
              redAlarm,
              yellowAlarm,
            }
          ],
          isFutureDate,
          notHuman: false,
          howManyNotHuman: 0,
          weekday,
          hasRedAlarm,
          hasYellowAlarm,
        });
      }
    });

    return result;
  }
);

export const sortWhoDontHaveBrigade = createSelector(

  whoDontHaveBrigade,

  (shifts): Map<string, SortShift> => {

    const map = new Map<string, SortShift>();

    for (const shift of shifts) {

      if (!map.has(shift.startDate)) {

        map.set(shift.startDate, {
          ...shift,
          peopleOnThisDay: [],
        });
        
      }

      map.get(shift.startDate)!.peopleOnThisDay.push(
        ...shift.peopleOnThisDay
      );
    }

    return map
  }
);