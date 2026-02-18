import type { PersonDto } from "./types/person.dto";

export const mockPeople: PersonDto[] = [
  { id: 1, name: "Роман", secondName: "Федосимов", brigade: 1 },
  { id: 2, name: "Дмитрий", secondName: "Смирнов", brigade: 1 },
  { id: 3, name: "Назир", secondName: "Ахмедов", brigade: 1 },
  { id: 4, name: "Андрей", secondName: "Ковалёв", brigade: 1 },
  { id: 5, name: "Иван", secondName: "Петров", brigade: 1 },
  { id: 6, name: "Сергей", secondName: "Морозов", brigade: 1 },

  { id: 7, name: "Алексей", secondName: "Ильин", brigade: 2 },
  { id: 8, name: "Максим", secondName: "Орлов", brigade: 2 },
  { id: 9, name: "Павел", secondName: "Егоров", brigade: 2 },
  { id: 10, name: "Владимир", secondName: "Соколов", brigade: 2 },
  { id: 11, name: "Олег", secondName: "Васильев", brigade: 2 },
  { id: 12, name: "Никита", secondName: "Фролов", brigade: 2 },

  { id: 13, name: "Игорь", secondName: "Кузнецов", brigade: 3 },
  { id: 14, name: "Антон", secondName: "Белов", brigade: 3 },
  { id: 15, name: "Денис", secondName: "Громов", brigade: 3 },
  { id: 16, name: "Михаил", secondName: "Зайцев", brigade: 3 },
  { id: 17, name: "Евгений", secondName: "Тихонов", brigade: 3 },
  { id: 18, name: "Артём", secondName: "Лебедев", brigade: 3 },

  { id: 19, name: "Руслан", secondName: "Алиев", brigade: 4 },
  { id: 20, name: "Тимур", secondName: "Сафаров", brigade: 4 },
  { id: 21, name: "Рустам", secondName: "Каримов", brigade: 4 },
  { id: 22, name: "Азат", secondName: "Хабибуллин", brigade: 4 },
  { id: 23, name: "Марат", secondName: "Юсупов", brigade: 4 },
  { id: 24, name: "Ильдар", secondName: "Нуриев", brigade: 4 },

  { id: 25, name: "Виктор", secondName: "Панфилов", brigade: 5 },
  { id: 26, name: "Константин", secondName: "Мельников", brigade: 5 },
  { id: 27, name: "Ярослав", secondName: "Романов", brigade: 5 },
  { id: 28, name: "Станислав", secondName: "Богданов", brigade: 5 },
  { id: 29, name: "Вячеслав", secondName: "Кириллов", brigade: 5 },
  { id: 30, name: "Георгий", secondName: "Данилов", brigade: 5 },
];

export const brigadeCycles: Record<number, { startDate: string; initialPhase: "morning" | "evening" | "night" }> = {
  1: { startDate: "2026-02-08", initialPhase: "night" },
  2: { startDate: "2026-02-08", initialPhase: "morning" },
  3: { startDate: "2026-02-08", initialPhase: "evening" },
  4: { startDate: "2026-02-09", initialPhase: "night" },
  5: { startDate: "2026-02-09", initialPhase: "morning" },
};