import { useState } from "react";
import type { BrigadesDto } from "../../../entities/brigades/types/brigades.dto";

export function useBrigadeSelector () {

    const [brigadeClick, setBrigadeClick] = useState<string[]>([]);
    const [addDateBrigade, setAddDateBrigade] = useState<string[]>([]);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [dateInput, setDateInput] = useState<Record<string, string>>({});


    function fnDiv (brigade: BrigadesDto) {
    
        setBrigadeClick((prev) => prev.includes(brigade.id) 
            ? prev.filter((id) => id !== brigade.id) 
            : [...prev, brigade.id]
        )

        setAddDateBrigade((prev) =>
            prev.filter((id) => id !== brigade.id)
        )
        
    }

    function addDate(brigade: BrigadesDto) {
        setAddDateBrigade(
        (prev) => prev.includes(brigade.id)
            ? prev.filter((id) => id !== brigade.id) 
            : [...prev, brigade.id]
        )
    }

    return{
        brigadeClick,
        addDateBrigade,
        fnDiv,
        addDate,
        newUser, 
        setNewUser,
        dateInput,
        setDateInput
    };

}