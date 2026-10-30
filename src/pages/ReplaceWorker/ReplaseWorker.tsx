import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPesonsApi, useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { brigadesSortArr } from '../../entities/brigades/model/selectors/mapperBrigades';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import styles from './ReplaseWorker.module.scss';
import { ReplaceWorkerProcess } from './widgets/ReplaceWorkerProcess/ReplaceWorkerProcess';
import { ReplaceWorkerFilters } from './widgets/ReplaceWorkerFilters/ReplaceWorkerFilters';
import { supabase } from '../../shared/api/supabase/client';
import { useFilter } from './model/useFilter';
import { blockPerson, dischargePerson, jobTitlePerson } from './model/selectorsReplaceWorker';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';
import type { SelectedPerson } from './types/typeReplaseWorker';
import { sortShiftMap, sortWhoDontHaveBrigade } from '../Home/adminPage/model/selectorsAdminPage';
import { toast } from 'sonner';
import { getPersonReplacementApi, useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import { ModalWorkerFilters } from '@/shared/ui/Modal/ModalWorkerFilters/ModalWorkerFilters';

export function ReplaseWorker () {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const personId: string | null = searchParams.get("personId");
    const personWhoWasReplacedBrigadeId: string | null = searchParams.get("brigadeId");
    const dateStore: string = searchParams.get("date") ?? '';

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    const brigadesArr = useSelector(brigadesSortArr) as Brigade[];
    const jobTitleArr = useSelector(jobTitlePerson) as string[];
    const blockArr = useSelector(blockPerson) as string[];
    const dischargeArr = useSelector(dischargePerson) as number[];
    const shiftSort = useSelector(sortShiftMap) as Map<string, SortShift[]>; 
    
    // чтобы дойти до этого окна
    // начальник должен был:
    // нажать на день в календаре, где при нажатии сразу в dateStore кладется выбранный день
    // нажал на пользователя которого надо заменить и мы в этом окне с датой в которой надо кого поменять
    const russianDate: string = `${dateStore.slice(8, 10)}-${dateStore.slice(5,7)}-${dateStore.slice(0,4)}`
    
    // при нажатии на item пользователя в widget ReplaceWorkerItem
    // срабатывает onSelectedPerson и добавляет в selectedPerson этого пользователя
    // selectedPerson передается в в widget ReplaceWorkerProcess
    // там проверяем через хук useCheckPersonStatus
    // что у выбранного пользователя в этот день нету проблем
    const [selectedPerson, onSelectedPerson] = useState<SelectedPerson>({
        personObj: null,
        brigade: null,
    });

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [selectedPerson])

    const shiftsWhoDontHaveBrigade = useSelector(sortWhoDontHaveBrigade);

    const shiftsWithoutBrigadeToday: SortShift | undefined = shiftsWhoDontHaveBrigade.get(dateStore);

    const foundShift: SortShift | undefined = shiftSort.get(dateStore)?.find(
        
        (b) => b.brigade.id === personWhoWasReplacedBrigadeId

    );


    const personWhoWasReplacedId = foundShift?.peopleOnThisDay.find(

        (p) => p.id === personId

    ) ?? null

    const arrProblemPersonToReplace: string[] = [

        ...personWhoWasReplacedId?.redAlarm ?? [],
        ...personWhoWasReplacedId?.yellowAlarm ?? [],
    ]

    const shiftsToday: SortShift[] = shiftSort.get(dateStore) ?? [];

    const brigadesAndDontBrigade: SortShift[] = [
        ...shiftsToday,
        ...(shiftsWithoutBrigadeToday
            ? [shiftsWithoutBrigadeToday]
            : [])
    ];

    const [modal, onModal] = useState<boolean>(false);

    const {
        filteredPeople,
        inputText,
        onInputText,
        filterApply,
        onfilterApply,
        filters,
        onFilters
    } = useFilter({
        personWhoWasReplacedId,
        brigadesAndDontBrigade,
        shiftsWithoutBrigadeToday
    });

    async function ap(selectedHuman: Persons): Promise<void> {

        if(
            personWhoWasReplacedId && 
            selectedPerson.brigade?.id && 
            selectedPerson.brigade.id !== 'no-brigade'
        ){

            const { error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,

                    //человек которого меняют
                    person_who_was_replaced_id: personWhoWasReplacedId.id,
                    person_who_was_replaced_brigade_id: personWhoWasReplacedBrigadeId,

                    // человек на которого меняют 
                    person_replaced_id: selectedHuman?.id,
                    person_replaced_brigade_id: selectedPerson?.brigade.id,
                }
            ]);

            if (error) {
                toast.error("Ошибка при отправке запроса", {
                    description: error.message,
                });
                return;
            }

            personsQuery.refetch();
            personReplacementQuery.refetch();

            toast.success("Успешно");

            navigate('/');

        }

        if(
            personWhoWasReplacedId && 
            selectedPerson.brigade?.id && 
            selectedPerson.brigade.id === 'no-brigade'
        ){

            const { error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,

                    //человек которого меняют
                    person_who_was_replaced_id: personWhoWasReplacedId.id,
                    person_who_was_replaced_brigade_id: personWhoWasReplacedBrigadeId,

                    // человек на которого меняют 
                    person_replaced_id: selectedHuman?.id,
                    person_replaced_brigade_id: null,
                }
            ]);

            if (error) {
                toast.error("Ошибка при отправке запроса", {
                    description: error.message,
                });
                return;
            }

            personsQuery.refetch();
            personReplacementQuery.refetch();

            toast.success("Успешно");

            navigate('/');

        }
        
        if(
            !personWhoWasReplacedId &&
            selectedPerson.brigade?.id &&
            selectedPerson.brigade?.id !== 'no-brigade'
        ){

            const { error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,

                    person_who_was_replaced_id: null,
                    person_who_was_replaced_brigade_id: personWhoWasReplacedBrigadeId,

                    person_replaced_id: selectedHuman.id,
                    person_replaced_brigade_id: selectedPerson.brigade?.id,

                }
            ]);

            if (error) {
                toast.error("Ошибка при отправке запроса", {
                    description: error.message,
                });

                return;
            }

            getPesonsApi.util.invalidateTags(['Persons']);
            getPersonReplacementApi.util.invalidateTags(['Replacement']);

            personsQuery.refetch();
            personReplacementQuery.refetch();

            toast.success("Успешно");

            navigate('/');

        }

        if(
            !personWhoWasReplacedId &&
            selectedPerson.brigade?.id &&
            selectedPerson.brigade?.id === 'no-brigade'
        ){

            const { error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,

                    person_who_was_replaced_id: null,
                    person_who_was_replaced_brigade_id: personWhoWasReplacedBrigadeId,

                    person_replaced_id: selectedHuman.id,
                    person_replaced_brigade_id: null,

                }
            ]);

            if (error) {
                toast.error("Ошибка при отправке запроса", {
                    description: error.message,
                });

                return;
            }

            personsQuery.refetch();
            personReplacementQuery.refetch();

            toast.success("Успешно");

            navigate('/');

        }

    }

    if(
        personsQuery.isLoading || 
        brigadesQuery.isLoading || 
        personReplacementQuery.isLoading ||
        shiftQuery.isLoading
    ){
        return(
            <div>
                грузится
            </div>
        )
    }
    
    return (

        <main
            className={styles["userChange"]}
        >

            <h4
                className={styles["userChange__dateStore"]}
            >
                <span
                    className={styles["userChange__dateStore--text"]}
                >
                    Замена сотрудника на:
                </span>

                <span
                    className={styles["userChange__dateStore--date"]}
                >
                    {russianDate}
                </span>

            </h4>
            
            <ReplaceWorkerProcess
                selectedPerson={selectedPerson}
                personToReplace={personWhoWasReplacedId}
                arrProblemPersonToReplace={arrProblemPersonToReplace}
                ap={ap}
            />

            <ReplaceWorkerFilters
                inputText={inputText}
                onInputText={onInputText}
                modal={modal}
                onModal={onModal}
                filters={filters}
                brigadesArr={brigadesArr}
            />

            <section>

                <ul
                    className={styles["userChange__peopleList"]}
                >

                    {filteredPeople.map((b) => {

                        if(b.peopleOnThisDay.length === 0){
                            return null
                        }
                        
                        return(
                            <li
                                className={styles["userChange__peopleItem"]}
                            >

                                <h3
                                    className={styles["userChange__peopleTitle"]}
                                >
                                    <span
                                        className={styles["userChange__peopleTitle--name"]}
                                    >
                                        {b.brigade.name}
                                    </span>

                                    <span
                                        className={`
                                            ${styles["userChange__peopleTitle--curentBrigade"]}
                                            ${b.brigade.id === personWhoWasReplacedBrigadeId 
                                                ? styles["userChange__peopleTitle--curentBrigade--view"]
                                                : styles["userChange__peopleTitle--curentBrigade--notView"]
                                            }
                                        `}
                                    >
                                        Эту бригаду сейчас редактируете
                                    </span>

                                </h3>

                                <div
                                    className={styles["userChange__peopleBlock"]}
                                >
                                    {b.peopleOnThisDay.map((p) => (
                                        <React.Fragment key={p.id}>
                                            {WorkItemCardFactory.workActionDetailCard({
                                                name: p.name,
                                                surname: p.surname,
                                                otherSurname: p.other_surname,
                                                job_title: p.job_title,
                                                block: p.block,
                                                discharge: p.discharge,
                                                avalibleBlocks: p.he_can ?? [],
                                                personId: p.id,
                                                redAlarm: p.redAlarm,
                                                yellowAlarm: p.yellowAlarm,
                                                onSelectedPerson: onSelectedPerson,
                                                personToReplace: personWhoWasReplacedId,
                                                b: b.brigade,
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>

                            </li>
                        )

                    })}

                </ul>

            </section>

            <ModalWorkerFilters
                modal={modal}
                onModal={onModal}
                brigadesArr={brigadesArr}
                jobTitleArr={jobTitleArr}
                blockArr={blockArr}
                dischargeArr={dischargeArr}
                filters={filters}
                onFilters={onFilters}
                filterApply={filterApply}
                onFilterApply={onfilterApply}
            />

        </main>
    )
}