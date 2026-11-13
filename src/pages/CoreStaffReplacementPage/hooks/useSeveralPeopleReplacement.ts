import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

interface Props {
    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>
    refetchData: () => void;
}

export function useSeveralPeopleReplacement (
    {
        listSelectedUsers,
        onListSelectedUsers,
        refetchData
    }: Props
) {

    // Включает режим выбора нескольких сотрудников
    const [isButtonSelectCheck, setIsButtonSelectCheck] = useState<boolean>(false);

    // Открывает модальное окно для массовой замены бригады
    const [isOpenModalSeveral, setIsOpenModalSeveral] = useState<boolean>(false);

    const [isBriadeId, setIsBrigadeId] = useState<string| null>(null);

    useEffect(() => {

        if(
            listSelectedUsers.length === 0 ||
            !isBriadeId
        ){
            return
        }

        async function handleApply() {
        
            if (!isBriadeId) {
                toast.error('Выберите бригаду');
                return;
            }

            if (listSelectedUsers.length === 0) {
                toast.error('Не предвиденная ошибка');
                return;
            }

            const { error } = await supabase
                .from('persons')
                .update({ brigade_id: isBriadeId === 'no_brigade'? null : isBriadeId })
                .in('id', listSelectedUsers);

            if (error) {
                toast.error('Ошибка при изменении бригад', {
                    description: error.message,
                });
                return;
            }

            toast.success('Бригады сотрудников успешно изменены');

            refetchData();

            setIsOpenModalSeveral(false);
            onListSelectedUsers([]);
            setIsBrigadeId(null);
            setIsButtonSelectCheck(false);
        }

        handleApply();

    }, [isBriadeId, setIsBrigadeId]);

    return{
        isButtonSelectCheck,
        setIsButtonSelectCheck,
        isOpenModalSeveral,
        setIsOpenModalSeveral,
        setIsBrigadeId
    }
}