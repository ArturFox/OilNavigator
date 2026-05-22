import type { PersonsDto } from "../../../../api/persons/persons.dto";

export function isBrigadeUnderstaffed(people: PersonsDto[], minPeople = 7): boolean {
  return people.length < minPeople;
}