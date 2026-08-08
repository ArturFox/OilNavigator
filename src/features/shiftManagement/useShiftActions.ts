import { useAddShiftMutation } from "../../entities/shifts/api/getShifts";
import type { AddShiftDto } from "../../entities/shifts/types/shifts.dto";

export function useShiftActions () {

    const [addShift, { isLoading }] = useAddShiftMutation();

    async function createShiftPattern(data: AddShiftDto) {
        return addShift(data).unwrap();
    }

    return {
        createShiftPattern,
        isLoading,
    };

}