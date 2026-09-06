import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { blockPerson, dischargePerson, jobTitlePerson, personsMapper } from '../../entities/persons/model/selectors/persons';
import { brigadesSortArr } from '../../entities/brigades/model/selectors/brigades';
import type { RootState } from '../../app/store/store';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { PersonsWithStatus } from '../../entities/persons/types/persons.dto';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';
import { useCheckPersonStatus } from '../../features/hooks/useCheckPersonStatus';
import { Modal } from '../../shared/ui/Modal/Modal';
import styles from './ReplaseWorker.module.scss';
import { ReplaceWorkerItem } from './widgets/ReplaceWorkerItem/ReplaceWorkerItem';
import { ReplaceWorkerProcess } from './widgets/ReplaceWorkerProcess/ReplaceWorkerProcess';
import { useFilter } from '../../features/hooks/useFilter';
import { ReplaceWorkerFilters } from './widgets/ReplaceWorkerFilters/ReplaceWorkerFilters';
import { supabase } from '../../shared/api/supabase/client';

export function ReplaseWorker () {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();

    const people = useSelector(personsMapper);
    const brigadesArr = useSelector(brigadesSortArr) as Brigade[];
    const jobTitleArr = useSelector(jobTitlePerson) as string[];
    const blockArr = useSelector(blockPerson) as string[];
    const dischargeArr = useSelector(dischargePerson) as number[];
    
    // чтобы дойти до этого окна
    // начальник должен был:
    // нажать на день в календаре, где при нажатии сразу в dateStore кладется выбранный день
    // нажал на пользователя которого надо заменить и мы в этом окне с датой в которой надо кого поменять
    const dateStore: string = useSelector((state: RootState) => state.date.day);
    console.log(dateStore)
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
    const [selectedPerson, onSelectedPerson] = useState<PersonsWithStatus | null>(null);

    // при нажатии на item в widget PersonDropdownItem на иконку ArrowRightLeft
    // положили этого человека в state: {} от navigate
    // и вытаскиваем эти данные 
    const location = useLocation();

    let personToReplace: PersonsWithStatus | undefined;
    let arrProblemPersonToReplace: string[] = [];
    let shift: SortShift | undefined;

    if (location.state) {
        personToReplace = location.state.person;
        arrProblemPersonToReplace = (location.state.arrProblem ?? []);
        shift = location.state.shift;
    }

    const peopleWithStatus: PersonsWithStatus[] = useCheckPersonStatus(people, dateStore);

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
        peopleWithStatus,
        personToReplace
    });

    async function ap(selectedHuman: PersonsWithStatus): Promise<void> {

        if(personToReplace){

            const { data, error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,

                    //человек которого меняют
                    person_id: personToReplace?.id,
                    person_brigade_id: shift?.brigadeId,

                    // человек на которого меняют 
                    replacement_person_id: selectedHuman?.id,
                    replacement_brigade_id: selectedPerson?.brigade_id,
                }
            ]);

            if (error) {
                console.error('Ошибка при отправке запроса:', error.message);
                return;
            }

            console.log('Данные успешно добавлены:', data);

        } else {
            const { data, error } = await supabase
            .from('person_replacements')
            .insert([
                {
                    date: dateStore,
                    person_id: null,
                    replacement_person_id: selectedHuman?.id
                }
            ]);

            if (error) {
                console.error('Ошибка при отправке запроса:', error.message);
                return;
            }

            console.log('Данные успешно добавлены:', data);
        }

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
                personToReplace={personToReplace}
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

                    {filteredPeople.map((person) => (
                        
                        <ReplaceWorkerItem
                            key={person.id}
                            person={person}
                            personToReplace={personToReplace}
                            selected={selected}
                            onSelected={onSelected}
                            onSelectedPerson={onSelectedPerson}
                        />

                    ))}

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