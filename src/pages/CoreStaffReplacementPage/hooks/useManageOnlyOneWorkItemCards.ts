import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    refetchData: () => void;
}

export function useManageOnlyOneWorkItemCards (
    {
        refetchData
    }: Props
) {

    const [isApplymodalReplaceOnlyOne, setIsApplymodalReplaceOnlyOne] = useState<{
        personId: string;
        brigadeId: string;
    } | null>(null);

    useEffect(() => {
    
        if (!isApplymodalReplaceOnlyOne) return;

        const { personId, brigadeId } = isApplymodalReplaceOnlyOne;

        if (!brigadeId) {
            toast.error('Добавте бригаду');
            return;
        }

        if (!personId) {
            toast.error('Добавте человека');
            return;
        }

        async function apply() {

            try{

                const { error } = await supabase
                    .from('persons')
                    .update({
                        brigade_id: brigadeId === 'no_brigade' ? null : brigadeId,
                    })
                    .eq('id', personId)
                ;

                if (error) {
                    throw new Error(`Ошибка при изменении бригады: ${error.message}`);
                }

                toast.success('Бригада успешно изменена');

                refetchData();

            }catch(error){

                if (error instanceof Error) {
                    toast.error('Ошибка при изменении бригады', {
                        description: error.message,
                    });
                } else {
                    toast.error('Ошибка при изменении бригады', {
                        description: 'Неизвестная ошибка',
                    });
                }

            }finally{
                setIsApplymodalReplaceOnlyOne(null);
            }

        }

        apply();

    }, [isApplymodalReplaceOnlyOne]);

    return{
        setIsApplymodalReplaceOnlyOne
    }
}