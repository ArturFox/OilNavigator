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

    const [isCreateNewBrigade, setIsCreateNewBrigade] = useState<{
        cycleStartDate: string,
        numberBrigade: number,
    }| null>(
        null
    );

    const [isCreateModal, setIsCreateModal] = useState<boolean>(false);

     useEffect(() => {

        if (
            !isCreateNewBrigade ||
            !installationId ||
            !isCreateNewBrigade.cycleStartDate ||
            !isCreateNewBrigade.numberBrigade
        ) {
            return;
        }

        const brigade = isCreateNewBrigade;

        async function addBrigade() {

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
                console.error('Ошибка создания бригады:', error);

                toast.error('Ошибка при создании бригады', {
                    description: error.message,
                });

                return;
            }

            toast.success('Бригада успешно создана');

            refetchData();

            setIsCreateNewBrigade(null);
            setIsCreateModal(false);
        }

        addBrigade();

    }, [isCreateNewBrigade]);

    return {
        isCreateModal,
        setIsCreateModal,
        setIsCreateNewBrigade
    }

}