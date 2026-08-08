import { useState } from "react";

interface Props {
    howManyButtonsWillBe: number;
    categoriesWorkModes?: string[][];
}

export function usePersonManagment({
    howManyButtonsWillBe, 
    categoriesWorkModes = []
}: Props) {

    const [whatTheUserSelected, onWhatTheUserSelected] = useState(() => {

        Array(howManyButtonsWillBe).fill('')

    });

    const [workModes, onWorkModes] = useState(() => {

        const result = Array(howManyButtonsWillBe).fill([]);

        categoriesWorkModes.forEach((item, index) => {
            result[index] = item;
        });

        return result;

    });

    return {
        workModes,
    }
}