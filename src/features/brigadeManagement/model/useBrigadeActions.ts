import { useAddBrigadeMutation, useDeletBrigadeMutation } from "../../../entities/brigades/api/getBrigades";
import type { CreateBrigadeDto } from "../../../entities/brigades/types/brigades.dto";

export function useBrigadeActions() {
    const [addBrigadeMutation, { isLoading: isCreating }] = useAddBrigadeMutation();
    const [deleteBrigadeMutation, { isLoading: isDeleting }] = useDeletBrigadeMutation();

    async function createBrigade(data: CreateBrigadeDto) {
        try {
            const result = await addBrigadeMutation(data).unwrap();
            return result;
        } catch (error) {
            console.error("createBrigade error:", error);
            return null;
        }
    }

    async function deleteBrigade(id: string) {
        try {
            const result = await deleteBrigadeMutation(id).unwrap();
            return result;
        } catch (error) {
            console.error("deleteBrigade error:", error);
            return null;
        }
    }

    return {
        createBrigade,
        deleteBrigade,
        isCreating,
        isDeleting,
    };
}