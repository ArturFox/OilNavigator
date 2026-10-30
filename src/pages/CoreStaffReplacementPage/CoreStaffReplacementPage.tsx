import { useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import styles from './CoreStaffReplacementPage.module.scss';
import { brigadeSortArrCoreStaffReplacement, peopleMapCoreStaffReplacement } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { supabase } from '../../shared/api/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { PeopleList } from './widgets/PeopleList/PeopleList';
import { Check } from 'lucide-react';
import { BrigadeList } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeList/BrigadeList';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { useSwipe } from '@/hooks/useSwipe';

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export function CoreStaffReplacementPage() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    // селекторы
    const brigadeSortArr = useSelector(brigadeSortArrCoreStaffReplacement) as Brigade[];
    const peopleMap = useSelector(peopleMapCoreStaffReplacement) as Map<string, Persons[]>;

    // состояния
    const [listSelectedUsers, onListSelectedUsers] = useState<PersonObj[]>([]);
    const [buttonSelectCheck, onButtonSelectCheck] = useState<boolean>(false);
    const [openModalSeveral, onOpenModalSeveral] = useState<boolean>(false);
    const [brigadeClick, onBrigadeClick] = useState<string>('no_brigade');
    const [apply, onApply] = useState<{
        personId: string;
        brigadeId: string;
    } | null>(null);

    // обработчик свайпа
    const currentIndex: number = brigadeSortArr.findIndex(
        (brigade) => brigade.id === brigadeClick
    );

    const {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useSwipe({
        currentIndex,
        brigadeSortArr,
        onBrigadeClick,
    });

    useEffect(() => {
        if (!apply) return;

        const { personId, brigadeId } = apply;

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
                .update({ brigade_id: brigadeId })
                .eq('id', personId);

            if (error) {
                toast.error('Ошибка при изменении бригады', {
                    description: error.message,
                });
                return;
            }

            toast.success('Бригада успешно изменена');

            personsQuery.refetch();
            brigadesQuery.refetch();
            personReplacementQuery.refetch();
            shiftQuery.refetch();

            onApply(null);
        }

        updateBrigade();

    }, [apply]);

    const brigadesId = brigadeSortArr.map((brigade) => brigade.id);
    const brigadesNumber = brigadeSortArr.map((brigade) => brigade.number_brigade);

    if(
        personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        personReplacementQuery.isLoading ||
        shiftQuery.isLoading
    ) {
        return (
            <div>
                ...Загурзка
            </div>
        )
    }

    return (

        <main className={styles['coreStaffReplacement']}> 

            <section 
                className={styles['coreStaffReplacement__brigadelist']}
            >

                <BrigadeList
                    brigadeSortArr={brigadeSortArr}
                    brigadeClick={brigadeClick}
                    onBrigadeClick={onBrigadeClick}
                    peopleMap={peopleMap}
                />
            
            </section>


            <section
                className={styles['coreStaffReplacement__header']}
            > 

                <h3
                    className={styles['coreStaffReplacement__heading']}
                >
                    <span
                        className={styles['coreStaffReplacement__brigade-name']}
                    >
                        {brigadeSortArr[currentIndex].name} 
                    </span>

                </h3>

                <article
                    className={styles['coreStaffReplacement__actions']}
                >

                    <button 
                        className={`
                            ${styles['coreStaffReplacement__applyButton']}
                            ${buttonSelectCheck && styles['coreStaffReplacement__applyButton--active']}
                            ${listSelectedUsers.length > 1 && styles['coreStaffReplacement__applyButton--apply']}
                        `}
                        onClick={() => {

                            if (listSelectedUsers.length === 0) {
                                
                                toast.error('Необходимо выбрать сотрудников');
                                return;
                            }

                            if (listSelectedUsers.length === 1) {
                                
                                toast.error('Необходимо выбрать минимум двоих');
                                return;
                            }

                            onOpenModalSeveral(!openModalSeveral);
                        }}
                    >
                        Применить
                    </button>
                    

                    <button
                        className={`
                            ${styles['coreStaffReplacement__selectionToggle']}
                        `}
                        onClick={() => {
                            const nextSelectSeveral = !buttonSelectCheck;

                            onButtonSelectCheck(nextSelectSeveral);

                            if (!nextSelectSeveral) {
                                onListSelectedUsers([]);
                                onOpenModalSeveral(false);
                            }
                        }}
                    >
    
                        <Check
                            className={` 
                                ${styles['coreStaffReplacement__selectionToggle-check']}
                                ${buttonSelectCheck && styles['coreStaffReplacement__selectionToggle-check--active']} 
                            `}
                        /> 

                    </button>

                </article>  

            </section>

            <section
                className={styles['coreStaffReplacement__brigadePeopleSlider']}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >

                <ul
                    className={styles['coreStaffReplacement__track']}
                    style={{
                        
                        transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                        
                        transition: isDragging ? 'none' : 'transform 0.3s ease'
                    }}
                >

                    {brigadeSortArr.map((brigade) => {

                        const brigadePeople = peopleMap.get(brigade.id) || [];
                        const doYouHaveAllPeople: boolean = brigadePeople.length >= 7;
                        const howMatch: number = doYouHaveAllPeople ? 0 : 7 - brigadePeople.length;

                        return(

                            <PeopleList
                                brigadeId={brigade.id}
                                howMatch={howMatch}
                                brigadePeople={brigadePeople}
                                listSelectedUsers={listSelectedUsers}
                                onListSelectedUsers={onListSelectedUsers}
                                buttonSelectCheck={buttonSelectCheck}
                                brigadesId={brigadesId}
                                brigadesNumber={brigadesNumber}
                                onApply={onApply}
                                brigades={brigadeSortArr}
                                people={peopleMap}
                            />

                        )

                    })}

                </ul>

            </section>

            {buttonSelectCheck && openModalSeveral &&
                LayoutFactory.layoutCenterBase({
                    openModalSeveral: openModalSeveral,
                    onOpenModalSeveral: onOpenModalSeveral,
                    children: (
                        <ModalFactory.modalReplaceSeveralSelect
                            brigadesId={brigadesId}
                            brigadesNumber={brigadesNumber}
                            arrSelectButton={listSelectedUsers}
                            onArrSelectButton={onListSelectedUsers}
                        />
                    )
                })
            }

        </main>

    );

}