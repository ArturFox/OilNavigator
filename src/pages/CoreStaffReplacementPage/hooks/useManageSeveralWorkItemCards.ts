import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    refetchData: () => void;
}

export function useManageSeveralWorkItemCards (
    {
        refetchData
    }: Props
) {

    // Включает режим выбора нескольких сотрудников
    const [isButtonSelectCheck, setIsButtonSelectCheck] = useState<boolean>(false);

    // Когда состояние isButtonSelectCheck === true, то при нажатии на кнопки 
    // "выбрать" сюда передается id выбранного человека
    const [isListSelectedUsers, setIsListSelectedUsers] = useState<string[]>([]);

    // Открывает модальное окно для массовой замены бригады
    const [isOpenModalSeveral, setIsOpenModalSeveral] = useState<boolean>(false);

    // При открытии модального окна, выходит список бригад 
    // и при нажатии на одну из них получаем сюда id выбранной бригады
    const [isApplymodalReplaceSeveral, setIsApplymodalReplaceSeveral] = useState<string| null>(null);

    useEffect(() => {

        if(
            !isButtonSelectCheck ||
            isListSelectedUsers.length === 0 ||
            !isOpenModalSeveral ||
            !isApplymodalReplaceSeveral
        ){
            return
        }

        async function apply() {
        
            try {

                const { error } = await supabase
                    .from('persons')
                    .update({
                        brigade_id: isApplymodalReplaceSeveral === 'no_brigade' ? null : isApplymodalReplaceSeveral
                    })
                    .in('id', isListSelectedUsers)
                ;

                if (error) {
                    throw error;
                }

                toast.success('Бригады сотрудников успешно изменены');

                refetchData();

            } catch(error){

                if (error instanceof Error) {
                    toast.error('Ошибка при изменении бригад', {
                        description: error.message,
                    });
                } else {
                    toast.error('Ошибка при изменении бригад', {
                        description: 'Неизвестная ошибка',
                    });
                }

            } finally{

                setIsOpenModalSeveral(false);
                setIsApplymodalReplaceSeveral(null);
                setIsListSelectedUsers([]);
                setIsButtonSelectCheck(false);
                
            }
        }

        apply();

    }, [isApplymodalReplaceSeveral]);

    return{
        isButtonSelectCheck,
        setIsButtonSelectCheck,
        isOpenModalSeveral,
        setIsOpenModalSeveral,
        setIsApplymodalReplaceSeveral,
        isListSelectedUsers,
        setIsListSelectedUsers
    }
}