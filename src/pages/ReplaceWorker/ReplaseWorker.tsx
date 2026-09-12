import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPesonsApi, useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { brigadesSortArr } from '../../entities/brigades/model/selectors/brigades';
import type { RootState } from '../../app/store/store';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { PersonsWithStatus } from '../../entities/persons/types/persons.dto';
import { Modal } from '../../shared/ui/Modal/Modal';
import styles from './ReplaseWorker.module.scss';
import { ReplaceWorkerItem } from './widgets/ReplaceWorkerItem/ReplaceWorkerItem';
import { ReplaceWorkerProcess } from './widgets/ReplaceWorkerProcess/ReplaceWorkerProcess';
import { ReplaceWorkerFilters } from './widgets/ReplaceWorkerFilters/ReplaceWorkerFilters';
import { supabase } from '../../shared/api/supabase/client';
import { useFilter } from './model/useFilter';
import { blockPerson, dischargePerson, jobTitlePerson } from './model/selectorsReplaceWorker';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';
import type { SelectedPerson } from './types/typeReplaseWorker';
import { sortWhoDontHaveBrigade } from '../Home/adminPage/model/selectorsAdminPage';
import { toast } from 'sonner';
import { getPersonReplacementApi, useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';

export function ReplaseWorker () {

    const navigate = useNavigate();
    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();

    console.log("SUBSCRIPTION:", personReplacementQuery);

    const brigadesArr = useSelector(brigadesSortArr) as Brigade[];
    const jobTitleArr = useSelector(jobTitlePerson) as string[];
    const blockArr = useSelector(blockPerson) as string[];
    const dischargeArr = useSelector(dischargePerson) as number[];
    
    // чтобы дойти до этого окна
    // начальник должен был:
    // нажать на день в календаре, где при нажатии сразу в dateStore кладется выбранный день
    // нажал на пользователя которого надо заменить и мы в этом окне с датой в которой надо кого поменять
    const dateStore: string = useSelector((state: RootState) => state.date.day);
    const russianDate: string = `${dateStore.slice(8, 10)}-${dateStore.slice(5,7)}-${dateStore.slice(0,4)}`

    // только для визуального эффекта в widget ReplaceWorkerItem
    // при нажатии на item пользователя
    // его border становится желтый
    // сюда записали id какого пользователя выбрали
    const [selected, onSelected] = useState<string>('');
    
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

    // при нажатии на item в widget PersonDropdownItem на иконку ArrowRightLeft
    // положили этого человека в state: {} от navigate
    // и вытаскиваем эти данные 
    const location = useLocation();

    const personWhoWasReplacedId: PersonsWithStatus | null = (location.state.personWhoWasReplacedId ?? null);
    const arrProblemPersonToReplace: string[] = (location.state.arrProblem ?? []);
    const personWhoWasReplacedBrigadeId: string = location.state.personWhoWasReplacedBrigadeId;
    const shiftsToday: SortShift[] = location.state.shiftsToday;

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

    async function ap(selectedHuman: PersonsWithStatus): Promise<void> {

        if(
            personWhoWasReplacedId && 
            selectedPerson.brigade?.id && 
            selectedPerson.brigade.id !== 'no-brigade'
        ){

            const { data, error } = await supabase
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

            const { data, error } = await supabase
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

            const { data, error } = await supabase
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

            const { data, error } = await supabase
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

    if(personsQuery.isLoading || brigadesQuery.isLoading){
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
                                    {
                                        b.peopleOnThisDay.map((p) => (

                                            <ReplaceWorkerItem
                                                key={p.id}
                                                person={p}
                                                personToReplace={personWhoWasReplacedId}
                                                selected={selected}
                                                onSelected={onSelected}
                                                onSelectedPerson={onSelectedPerson}
                                                b={b.brigade}
                                            />
                                        ))
                                    }
                                </div>

                            </li>
                        )

                    })}

                </ul>

            </section>

            <Modal
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