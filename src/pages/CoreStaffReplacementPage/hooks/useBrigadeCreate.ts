import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    refetchData: () => void;
    installationId: string;
}

export function useBrigadeCreate (
    {
        installationId,
        refetchData
    }: Props
) {

    // Состояние для открытия модалки 
    const [isModalWhereCreateNewBrigade, setIsModalWhereCreateNewBrigade] = useState<boolean>(false);

    // Состояние куда пользователь передаст данные при нажатии 
    // на кнопку в модалке для создания новой бригады
    const [isCreateNewBrigade, setIsCreateNewBrigade] = useState<{
        cycleStartDate: string,
        numberBrigade: number,
    }| null>(
        null
    );

    // состояние чтобы пользователь во время выполнения запроса
    // не вызвал еще один запрос
    const [isLoadingCreateNewBrigade, setIsLoadingCreateNewBrigade] = useState<boolean>(false);

     useEffect(() => {

        if (
            !isCreateNewBrigade ||
            !installationId ||
            !isCreateNewBrigade.cycleStartDate ||
            !isCreateNewBrigade.numberBrigade ||
            !isModalWhereCreateNewBrigade
        ) {
            return;
        }

        const brigade = isCreateNewBrigade;

        async function apply() {

            setIsLoadingCreateNewBrigade(true);

            try {

                const { error } = await supabase
                    .from('brigades')
                    .insert({
                        name: `Бригада ${brigade.numberBrigade}`,
                        cycle_start_date: brigade.cycleStartDate,
                        installation_id: installationId,
                        number_brigade: brigade.numberBrigade,
                    })
                ;

                if (error) {
                    throw error;
                }

                toast.success('Бригада успешно создана');

                refetchData();

            } catch(error){

                if (error instanceof Error) {
                    toast.error('Ошибка при создании бригады', {
                        description: error.message,
                    });
                } else {
                    toast.error('Ошибка при создании бригады', {
                        description: 'Неизвестная ошибка',
                    });
                }

            } finally{

                setIsCreateNewBrigade(null);
                setIsModalWhereCreateNewBrigade(false);
                setIsLoadingCreateNewBrigade(false);

            }

        }

        apply();

    }, [isCreateNewBrigade, isModalWhereCreateNewBrigade]);

    return {
        setIsCreateNewBrigade,
        isModalWhereCreateNewBrigade,
        setIsModalWhereCreateNewBrigade,
        isLoadingCreateNewBrigade
    }

}