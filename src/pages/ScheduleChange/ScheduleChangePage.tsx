import { useDispatch, useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import styles from './ScheduleChangePage.module.scss';
import { brigadeSortArrScheduleChange, peopleMapScheduleChange } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { resetBrigadeTransfer, type RootState } from '../../app/store/store';
import { supabase } from '../../shared/api/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { PeopleList } from './widgets/PeopleList/PeopleList';
import { BrigadeList } from './widgets/BrigadeList/BrigadeList';
import { BadgeCheck } from 'lucide-react';

export function ScheduleChangePage() {

    const dispatch = useDispatch();

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    const brigadeSortArr = useSelector(brigadeSortArrScheduleChange) as Brigade[];
    const peopleMap = useSelector(peopleMapScheduleChange) as Map<string, Persons[]>;
    const brigadeTransfer = useSelector((state: RootState) => state.date.brigadeTransfer);

    if(
        personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        personReplacementQuery.isLoading ||
        shiftQuery.isLoading
    ) {
        <div>
            ...Загурзка
        </div>
    }

    useEffect(() => {
        if (
            brigadeTransfer.person &&
            brigadeTransfer.brigade
        ) {
            handleApply();
        }
    }, [brigadeTransfer]);

    async function handleApply() {
        
        if (!brigadeTransfer.person || !brigadeTransfer.brigade) return;

        let brigadeId: string | null;

        if(brigadeTransfer.brigade.id === 'no_brigade'){
            brigadeId = null
        }else{
            brigadeId = brigadeTransfer.brigade.id
        }

        const { error } = await supabase
            .from('persons') 
            .update({ brigade_id: brigadeId })
            .eq('id', brigadeTransfer.person.id);

        

        if (error) {
            toast.error("Ошибка при отправке запроса", {
                description: error.message,
            });
            return;
        }
        dispatch(resetBrigadeTransfer());
        personsQuery.refetch();
        personReplacementQuery.refetch();
        personReplacementQuery.refetch();
        shiftQuery.refetch();


        toast.success("Успешно", {
            position: 'top-right',
            icon: <BadgeCheck />,
            style: {
                background: 'var(--greenBlack)',
                color: 'var(--white)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'center',
                
                minWidth: '280px',
            },
        });
       
    };

    const [brigadeClick, onBrigadeClick] = useState<string>('no_brigade');
    
    const currentIndex: number = brigadeSortArr.findIndex(
        (brigade) => brigade.id === brigadeClick
    );

    return (

        <main className={styles['scheduleChange']}> 

            <h4
                className={styles['scheduleChange__h4']}
            >
                Основной состав бригад
            </h4>

            <section 
                className={styles['brigadeChange']}
            >

                <BrigadeList
                    brigadeSortArr={brigadeSortArr}
                    brigadeClick={brigadeClick}
                    onBrigadeClick={onBrigadeClick}
                    peopleMap={peopleMap}
                />

                <h3
                    className={styles['brigadeChange__title']}
                >
                    {brigadeSortArr[currentIndex].name}
                </h3>

                <PeopleList
                    brigadeSortArr={brigadeSortArr}
                    peopleMap={peopleMap}
                    currentIndex={currentIndex}
                    onBrigadeClick={onBrigadeClick}
                />

            </section>

        </main>

    );

}