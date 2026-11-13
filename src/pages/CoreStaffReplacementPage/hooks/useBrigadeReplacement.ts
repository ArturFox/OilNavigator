import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    refetchData: () => void;
}

export function useBrigadeReplacement (
    {
        refetchData
    }: Props
) {

    const [isBrigadeReplacement, setIsBrigadeReplacement] = useState<{
        personId: string;
        brigadeId: string;
    } | null>(null);

    useEffect(() => {
    
        if (!isBrigadeReplacement) return;

        const { personId, brigadeId } = isBrigadeReplacement;

        if (!brigadeId) {
            toast.error('Добавте бригаду');
            return;
        }

        if (!personId) {
            toast.error('Добавте человека');
            return;
        }

        async function updateBrigade() {

            const { error } = await supabase
                .from('persons')
                .update({
                    brigade_id: brigadeId === 'no_brigade' ? null : brigadeId,
                })
                .eq('id', personId)
            ;

            if (error) {
                toast.error('Ошибка при изменении бригады', {
                    description: error.message,
                });
                return;
            }

            toast.success('Бригада успешно изменена');

            refetchData();

            setIsBrigadeReplacement(null);
        }

        updateBrigade();

    }, [isBrigadeReplacement]);

    return{
        setIsBrigadeReplacement
    }
}