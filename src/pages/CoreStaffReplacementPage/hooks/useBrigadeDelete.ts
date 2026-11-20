import type { Persons } from "@/entities/persons/types/persons.dto";
import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    peopleMap: Map<string, Persons[]>
    refetchData: () => void;
}

export function useBrigadeDelete(
    {
        peopleMap,
        refetchData
    }: Props
){

    // Состояние для открытия модалки
    const [isModalWhereDeleteBrigade, setIsModalWhereDeleteBrigade] = useState<boolean>(false);

    // состояние где хранится id выбранной бригады
    const [isBrigadeIdDeleteBrigade, setIsBrigadeIdDeleteBrigade] = useState<string | null>(null);

    // состояние чтобы пользователь во время выполнения запроса
    // не вызвал еще один запрос
    const [isLoadingDeleteBrigade, setIsLoadingDeleteBrigade] = useState<boolean>(false);

    useEffect(() => {

        if (
            !isBrigadeIdDeleteBrigade ||
            !isModalWhereDeleteBrigade
        ) {
            return;
        }

        const idBrigade: string = isBrigadeIdDeleteBrigade;

        async function apply() {

            setIsLoadingDeleteBrigade(true);

            try {

                const persons: Persons[] = peopleMap.get(idBrigade) ?? [];

                if (persons.length > 0) {

                    const { error } = await supabase
                        .from('persons')
                        .update({ brigade_id: null })
                        .in('id', persons.map((person) => person.id));

                    if (error) {
                        throw new Error(`Ошибка при переводе сотрудников: ${error.message}`);
                    }

                }

                const { error } = await supabase
                    .from('brigades')
                    .delete()
                    .eq('id', idBrigade);

                if (error) {
                    throw new Error(`Ошибка при удалении бригады: ${error.message}`);
                }

                toast.success('Бригада успешно удалена');

                refetchData();

            } catch(error){

               if (error instanceof Error) {
                    toast.error('Ошибка при выполнении операции', {
                        description: error.message,
                    });
                } else {
                    toast.error('Ошибка при выполнении операции', {
                        description: 'Неизвестная ошибка',
                    });
                }

            } finally {
                setIsModalWhereDeleteBrigade(false);
                setIsLoadingDeleteBrigade(false);
                setIsBrigadeIdDeleteBrigade(null);
            }
        }

        apply();

    }, [isBrigadeIdDeleteBrigade, isModalWhereDeleteBrigade, peopleMap, refetchData]);

    return {
        isModalWhereDeleteBrigade,
        setIsModalWhereDeleteBrigade,
        isLoadingDeleteBrigade,
        setIsBrigadeIdDeleteBrigade
    };

}