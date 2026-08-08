import { useState } from "react";
import type { PersonsDto } from "../../../entities/persons/types/persons.dto";

export function usePersonsEditor(persons: Map<string, PersonsDto[]>) {

    const [currentButton, setCurrentButton] = useState('no_brigade');
    const [changePerson, setChangePerson] = useState<boolean>();
    const [personObj, setPersonObj] = useState<PersonsDto>();

    function click(id: string) {
        setCurrentButton(id);
    };

    function clickChangePerson (obj: PersonsDto) {
        setChangePerson((prev) => !prev);
        setPersonObj(obj);
    };

    const selectedCrew = persons.get(currentButton) || [];

    return {
        selectedCrew,
        currentButton,
        click,
        clickChangePerson,
        changePerson,
        personObj
    };
}