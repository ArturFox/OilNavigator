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

    // состояние где хранится id выбранной бригады
    const [isBrigadeId, setIsBrigadeId] = useState<string | null>(null);

    // состояние чтобы пользователь во время выполнения запроса
    // не вызвал еще один запрос
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // состояние для открытия модалки
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    useEffect(() => {

        if (!isBrigadeId) {
            return;
        }

        const idBrigade: string = isBrigadeId;

        async function deleteBrigade() {

            setIsLoading(true);

            try {
                const persons: Persons[] = peopleMap.get(idBrigade) ?? [];

                if (persons.length > 0) {

                    const { error } = await supabase
                        .from('persons')
                        .update({ brigade_id: null })
                        .in('id', persons.map((person) => person.id));

                    if (error) {
                        toast.error('Ошибка при переводе сотрудников', {
                            description: error.message,
                        });
                        return;
                    }
                }

                const { error } = await supabase
                    .from('brigades')
                    .delete()
                    .eq('id', idBrigade);

                if (error) {
                    toast.error('Ошибка при удалении бригады', {
                        description: error.message,
                    });
                    return;
                }

                toast.success('Бригада успешно удалена');

                refetchData();

                setIsBrigadeId(null);
                setIsDeleteModal(false);

            } finally {
                setIsLoading(false);
            }
        }

        deleteBrigade();

    }, [isBrigadeId]);

    return {
        isDeleteModal,
        setIsDeleteModal,
        isLoading,
        setIsBrigadeId
    };

}