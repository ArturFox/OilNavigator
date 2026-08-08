import { useState } from "react";

interface Props {
    installation?: string
}

export function useOverlay ({installation}: Props) {

    const [brigadeNumber, setBrigadeNumber] = useState<number | ''>('');

    if (!installation) {
        return {
            brigadeNumber,
            setBrigadeNumber,
            newUserSend: null,
        };
    }

    const newUserSend = {

        name: `Бригада ${String(brigadeNumber)}`,
        installation_id: installation,
        number_brigade: brigadeNumber,
    }

    return {
        brigadeNumber,
        setBrigadeNumber,
        newUserSend,
    };

}