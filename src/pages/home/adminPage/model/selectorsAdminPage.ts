import { createSelector } from "@reduxjs/toolkit";
import { brigadesMapper } from "../../../../entities/brigades/model/selectors/mapperBrigades";
import type { Brigade } from "../../../../entities/brigades/types/brigades.dto";
import type { RootState } from "../../../../app/store/store";
import { personsMapper } from "../../../../entities/persons/model/selector/selectorPersons";
import type { Persons } from "../../../../entities/persons/types/persons.dto";
import { shiftsMapper } from "../../../../entities/shifts/model/selector/selectorShifts";
import type { Shift, SortShift } from "../../../../entities/shifts/types/shifts.dto";
import { personsReplacementMapper } from "../../../../entities/personReplacement/model/selector/selectorPersonReplacement";
import type { PersonReplacementMapper } from "@/entities/personReplacement/types/personReplacement.dto";

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

    // будующий результат 
    const result: SortShift[] = [];

    // берем дату из стора 
    // и вытаскивает год и месяц
    // ВАЖНО: месяц приходит с числом как в нашем календаре 
    //        то есть Октябрь в календаре = 10 и приходит из стора 10
    const [year, month] = monthSelected.split("-").map(Number);

    // узнаем количество дней в месяце
    const daysInMonth: number = new Date(year, month, 0).getDate();

    // создаем дату сегодняшнего дня
    // если в календаре 2026-10-18 то и тут будет такая же дата
    const todayDate: Date = new Date();
    const todayDateString = `${todayDate.getFullYear()}-${String(todayDate.getMonth()+1).padStart(2,'0')}-${String(todayDate.getDate()).padStart(2,'0')}`;

    // создаем дату на 7 дней больше
    // если в календаре 2026-10-25 то и тут будет такая же дата
    const sevenPlusDays = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate() + 7
    );
    const sevenPlusDaysString = `${sevenPlusDays.getFullYear()}-${String(sevenPlusDays.getMonth()+1).padStart(2,'0')}-${String(sevenPlusDays.getDate()).padStart(2,'0')}`;

    // начинаем идти по каждой бригаде
    brigades.forEach((brigade) => {

      // проверка что есть дата начала первого дня смены
      if (!brigade.cycle_start_date) return;

      // берем дату начала первого дня смены 
      // которая пришла из бд и переводим ее в локальную дату
      // где есть год, месяц, день, а всё остальное по нулям
      // это для безопасности 
      const baseDate: Date = toDateKey(new Date(brigade.cycle_start_date));

      // берем массив смен из бд
      // бд дает в хаотичном состоянии поэтому
      // сортируем по index это поле обязательное в бд
      const brigadePattern: Shift[] = [...(shift.get(brigade.id) ?? [])].sort((a, b) => a.day_index - b.day_index);

      if(brigadePattern.length === 0) return;

      // для бригады составляем на каждый день распиание
      for(let day = 1; day <= daysInMonth; day++){

        // создаем дату на конкретный день по которому итерируемся
        const currentDate = new Date(year, month - 1, day);

        // создаем из этой даты две строчные даты где
        // первая в формате 2026-10-10
        // вторая русская 10-10-2026
        const currentDateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(currentDate.getDate()).padStart(2,'0')}`;
        const dateRussian = `${String(currentDate.getDate()).padStart(2,'0')}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${currentDate.getFullYear()}`;

        // создаем день недели
        const weekday: string = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(currentDate);

        // Вычисляем, сколько полных дней прошло между началом цикла бригады
        // (baseDate) и текущим днём расписания (currentDate).
        // Если currentDate позже baseDate, diff будет положительным;
        // если даты совпадают — 0; если currentDate раньше baseDate — отрицательным.
        // Допустим, baseDate — это 10 октября, дата начала цикла бригады.
        // currentDate	diff	Что происходит
        // 8 октября	-2	Пропускаем день через continue
        // 9 октября	-1	Пропускаем день через continue
        // 10 октября	0	Продолжаем вычисления
        // 11 октября	1	Продолжаем вычисления
        // 12 октября	2	Продолжаем вычисления
        const diff = Math.floor(
          (currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Если текущий день раньше даты начала цикла бригады,
        // пропускаем его: смены ещё не начались.
        if (diff < 0) continue;

        // бесконечный цикл
        // Дата	     diff diff % 4	Индекс смены
        // 10 октября	0	   0	       0 — первая
        // 11 октября	1	   1	       1 — вторая
        // 12 октября	2	   2	       2 — третья
        // 13 октября	3	   3	       3 — четвёртая
        // 14 октября	4	   0	       0 — первая
        // 15 октября	5	   1	       1 — вторая
        const template: Shift = brigadePattern[diff % brigadePattern.length];

        const normalizedCode = template.code === 'O' ? 'О' : template.code;

        // получаем массив людей из бригады по которой идем
        let personsOnThisDay: Persons[] = [...(persons.get(brigade.id) ?? [])];

        // из массива замен на конкретный один день 
        // берем и фильтруем его 
        // что день из бд === дню на котором мы сейчас находимся по итерации
        // что бригада из бд === бригаде по которой сейчас идем
        const dayReplacements: PersonReplacementMapper[] = personReplacement.filter(

            (replacement) => {
              
              const date = new Date(replacement.date);

              const dateString = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
              
              return (
                dateString === currentDateString &&
                replacement.personWhoWasReplacedBrigadeId === brigade.id
              );

            }
        );

        // Убираем того человека, 
        // кого заменяют, 
        // только если найдены замены
        if (dayReplacements.length > 0) {

          personsOnThisDay = personsOnThisDay.filter(

            (person) =>

              !dayReplacements.some(

                (replacement) => {

                  const personNotNull: boolean = replacement.personWhoWasReplacedId !== null;

                  const match: boolean =  replacement.personWhoWasReplacedId === person.id;

                  const sum: boolean = personNotNull && match;

                  return sum;
                
                }

              )

          );

        }

        // Добавляем тех, 
        // кто заменяет, 
        // только если найдены замены
        if (dayReplacements.length > 0) {

          dayReplacements.forEach((replacement) => {

            const replacementPerson = [...persons.values()]
              .flat()
              .find(
                person => person.id === replacement.personReplacedId
              );

            if (replacementPerson) {
              personsOnThisDay.push(replacementPerson);
            }

          });

        }

        //для отображения цвета
        //если день прошел то серый
        //если сегодняшний или будующий то синий
        const isFutureDate: boolean = todayDateString <= currentDateString;
      
        //Если в бригаде меньше 7 человек, то это true
        //и покажем в интерфейсе сколько человек не хваатает 
        const notHuman: boolean = personsOnThisDay.length < 7;
        const howManyNotHuman: number = 7 - personsOnThisDay.length;


        const personsStatus: Persons[] = personsOnThisDay.map((person) => {

          const redAlarm = [...person.redAlarm];
          const yellowAlarm = [...person.yellowAlarm];

          // ПРОБЛЕМЫ НА ЭТОТ ДЕНЬ

          if (
              person.vacation_start && 
              person.vacation_end && 
              currentDateString >= person.vacation_start && 
              currentDateString <= person.vacation_end
          ) {
              redAlarm.push("Отпуск");
          }

          if (
              person.sick_start && 
              person.sick_end && 
              currentDateString >= person.sick_start && 
              currentDateString <= person.sick_end
          ) {
              redAlarm.push("Больничный");
          }

          if(
              person.study_start && 
              person.study_end && 
              currentDateString >= person.study_start && 
              currentDateString <= person.study_end
          ) {
              redAlarm.push('Обучение');
          }

          // СОБЫТИЕ В БЛИЖАЙШИЕ 7 ДНЕЙ

          if (
              person.vacation_start && 
              person.vacation_start > currentDateString && 
              person.vacation_start <= sevenPlusDaysString
          ) {
              yellowAlarm.push("Скоро отпуск");
          }

          if (
              person.study_start && 
              person.study_start > currentDateString && 
              person.study_start <= sevenPlusDaysString
          ) {
              yellowAlarm.push("Скоро обучение");
          }

          return { 
            ...person,
            redAlarm,
            yellowAlarm
          };
        });

        const hasRedAlarm: boolean =
            isFutureDate &&
            (
                personsStatus.length < 7 ||
                personsStatus.some(person => person.redAlarm.length > 0)
            );

        const hasYellowAlarm: boolean =
            isFutureDate &&
            personsStatus.some(person => person.yellowAlarm.length > 0);


        result.push({
          id: `${currentDateString}-${brigade.id}`,
          brigade: brigade,
          startDate: currentDateString,
          code: normalizedCode,
          label: template.label,
          startTime: template.start_time?.slice(0, 5) ?? null,
          endTime: template.end_time?.slice(0, 5) ?? null,
          russianDate: dateRussian,
          peopleOnThisDay: personsStatus,
          isFutureDate: isFutureDate,
          notHuman: notHuman,
          howManyNotHuman: howManyNotHuman,
          weekday: weekday,
          hasRedAlarm: hasRedAlarm,
          hasYellowAlarm: hasYellowAlarm,
          color: template.color
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
          color: ''
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