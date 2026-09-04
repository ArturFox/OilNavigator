import { Menu, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { blockPerson, dischargePerson, jobTitlePerson, personsMapper } from '../../entities/persons/model/selectors/persons';
import { brigadesSortArr } from '../../entities/brigades/model/selectors/brigades';
import type { RootState } from '../../app/store/store';
import type { Brigade, BrigadesDto } from '../../entities/brigades/types/brigades.dto';
import type { PersonsWithStatus } from '../../entities/persons/types/persons.dto';
import type { SortShift } from '../../entities/shifts/types/shifts.dto';
import { useCheckPersonStatus } from '../../features/hooks/useCheckPersonStatus';
import { Modal } from '../../shared/ui/Modal/Modal';
import styles from './ReplaseWorker.module.scss';
import { ReplaceWorkerItem } from './widgets/ReplaceWorkerItem/ReplaceWorkerItem';
import { ReplaceWorkerProcess } from './widgets/ReplaceWorkerProcess/ReplaceWorkerProcess';
import { useFilter } from '../../features/hooks/useFilter';
import { ReplaceWorkerFilters } from './widgets/ReplaceWorkerFilters/ReplaceWorkerFilters';

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
    const personToReplace = location.state?.person as PersonsWithStatus;
    const arrProblemPersonToReplace = location.state.arrProblem as string[];
    const brigadeName = location.state.brigadeName as BrigadesDto;
    const shift = location.state.shift as SortShift;

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