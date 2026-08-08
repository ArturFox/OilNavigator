import { useState } from "react";
import type { DataType } from "../../../shared/constants/shifts";

export function useShiftTimeEditor() {
    const [flagOpenWindow, setFlagOpenWindow] = useState(false);
    const [localState, setLocalState] = useState<DataType | undefined>();

    function openWindow(data: DataType) {
        setFlagOpenWindow(prev => !prev);
        setLocalState(data);
    }

    return {
        flagOpenWindow,
        localState,
        openWindow,
        setFlagOpenWindow
    };
}