import { useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import styles from './CoreStaffReplacementPage.module.scss';
import { brigadeSortArrCoreStaffReplacement, peopleMapCoreStaffReplacement, peopleMapIdKeyCoreStaffReplacement } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { supabase } from '../../shared/api/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { PeopleList } from './widgets/PeopleList/PeopleList';
import { Check } from 'lucide-react';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { useSwipe } from '@/hooks/useSwipe';
import { DontHavePerson } from '@/pages/CoreStaffReplacementPage/widgets/DontHavePerson/DontHavePerson';
import { useNavigate } from 'react-router-dom';
import { BrigadeNavigationRow } from '@/shared/ui/BrigadeNavigation/BrigadeNavigationRow/BrigadeNavigationRow';

export function CoreStaffReplacementPage() {

    const navigate = useNavigate();

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    // селекторы
    const brigadeSortArr = useSelector(brigadeSortArrCoreStaffReplacement) as Brigade[];
    const peopleMap = useSelector(peopleMapCoreStaffReplacement) as Map<string, Persons[]>;
    const peopleMapIdKey = useSelector(peopleMapIdKeyCoreStaffReplacement) as Map<string, Persons>;

    // состояния
    const [listSelectedUsers, onListSelectedUsers] = useState<string[]>([]);
    const [buttonSelectCheck, onButtonSelectCheck] = useState<boolean>(false);
    const [openModalSeveral, onOpenModalSeveral] = useState<boolean>(false);
    const [isbrigadeSelectId, setIsbrigadeSelectId] = useState<string>('no_brigade');
    const [apply, onApply] = useState<{
        personId: string;
        brigadeId: string;
    } | null>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isAddNewBrigade, setIsaddNewBrigade] = useState<{
        cycle_start_date: string,
        installation_id: string,
        number_brigade: number,
    }| null>(
        null
    )

    // состояния для перехода на др страницу
    // первое состояние чтобы при нажатии на кнопку поменять флааг и запустить useEffect
    // второе состоняие чтобы передать id бригады, в какой бригаде будет замена 
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [targetBrigadeId, setTargetBrigadeId] = useState<string | null>(null);

    // обработчик свайпа
    const currentIndex: number = brigadeSortArr.findIndex(
        (brigade) => brigade.id === isbrigadeSelectId
    );

    const brigadesIdAndNumbers = brigadeSortArr.map((brigade) => ({
        brigadeId: brigade.id,
        brigadeNumber: brigade.number_brigade,
    }));

    const selectedPeople: Persons[] = listSelectedUsers.map(
        
        (personId) => peopleMapIdKey.get(personId)!

    );

    const brigadeList = brigadeSortArr.map((brigade) => {

        const currentPeople = peopleMap.get(brigade.id) ?? [];

        return {
            id: brigade.id,
            numberBrigade: brigade.number_brigade,
            isFull: currentPeople.length >= 7,
        };
    });

    const {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useSwipe({
        currentIndex,
        brigadesArr: brigadeSortArr,
        onBrigadeClick: setIsbrigadeSelectId,
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

            personsQuery.refetch();
            brigadesQuery.refetch();
            personReplacementQuery.refetch();
            shiftQuery.refetch();

            onApply(null);
        }

        updateBrigade();

    }, [apply]);

    useEffect(() => {

        if(!shouldRedirect && targetBrigadeId === null){
            return;
        }

        navigate(`/userChange?personId=${null}&brigadeId=${targetBrigadeId}&date=${null}&isCorePage=${String(true)}`);
        
    }, [shouldRedirect, setShouldRedirect, targetBrigadeId, setTargetBrigadeId])

    useEffect(() => {

        if (
            !isAddNewBrigade ||
            !isAddNewBrigade.cycle_start_date ||
            !isAddNewBrigade.installation_id ||
            !isAddNewBrigade.number_brigade
        ) {
            return;
        }

        const brigade = isAddNewBrigade;

        async function addBrigade() {

            const { error } = await supabase
                .from('brigades')
                .insert({
                    name: `Бригада ${brigade.number_brigade}`,
                    cycle_start_date: brigade.cycle_start_date,
                    installation_id: brigade.installation_id,
                    number_brigade: brigade.number_brigade,
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

            brigadesQuery.refetch();
            personsQuery.refetch();
            personReplacementQuery.refetch();
            shiftQuery.refetch();

            setIsaddNewBrigade(null);
            setIsCreate(false);
        }

        addBrigade();

    }, [isAddNewBrigade]);

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
                
                <BrigadeNavigationRow
                    brigadeList={brigadeList}
                    isbrigadeSelectId={isbrigadeSelectId}
                    setIsBrigadeSelectId={setIsbrigadeSelectId}
                    setIsDelete={setIsDelete}
                    setIsCreate={setIsCreate}
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

                        const brigadePeople = peopleMap.get(brigade.id) ?? [];
                        const doYouHaveAllPeople: boolean = brigadePeople.length >= 7;
                        const howMatch: number = doYouHaveAllPeople ? 0 : 7 - brigadePeople.length;

                        return (

                            <li
                                key={brigade.id}
                                className={styles['coreStaffReplacement__slide']}
                            >

                                {(!doYouHaveAllPeople && brigade.id !== 'no_brigade') &&
                                    <DontHavePerson
                                        howMatch={howMatch}
                                        shouldRedirect={shouldRedirect}
                                        setShouldRedirect={setShouldRedirect}
                                        brigadeId={brigade.id}
                                        setTargetBrigadeId={setTargetBrigadeId}
                                    />
                                }

                                <PeopleList
                                    brigadeId={brigade.id}
                                    brigadePeople={brigadePeople}
                                    listSelectedUsers={listSelectedUsers}
                                    onListSelectedUsers={onListSelectedUsers}
                                    buttonSelectCheck={buttonSelectCheck}
                                    brigadesIdAndNumbers={brigadesIdAndNumbers}
                                    onApply={onApply}
                                />

                            </li>

                        );

                    })}

                </ul>

            </section>

            {buttonSelectCheck && openModalSeveral &&
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: openModalSeveral,
                    onIsOpenModal: onOpenModalSeveral,
                    children: (
                        <ModalFactory.modalReplaceSeveralSelect
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            arrSelectButton={selectedPeople}
                        />
                    )
                })
            }

            {isDelete && 
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isDelete,
                    onIsOpenModal: setIsDelete,
                    children:  (
                        <ModalFactory.modalDeleteBrigade
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            onApply={() => {}}
                        />
                    )
                })
            }

            {isCreate &&
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isCreate,
                    onIsOpenModal: setIsCreate,
                    children: (
                        <ModalFactory.modalAddBrigade
                            installation_id={brigadeSortArr[0].installation_id}
                            onApply={setIsaddNewBrigade}
                        />
                    )
                })
            }

        </main>

    );

}