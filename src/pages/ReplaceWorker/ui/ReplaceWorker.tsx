import { Menu, Search } from 'lucide-react';
import styles from './ReplaceWorker.module.scss';
import { useSelector } from 'react-redux';
import { useGetPesonsQuery } from '../../../entities/persons/api/getPersons';
import { useState } from 'react';
import type { PersonsWithStatus } from '../../../entities/persons/types/persons.dto';
import { ReplaceWorkerProcess } from '../../../widgets/ReplaceWorkerWidget/ReplaceWorkerProcess';
import { ReplaceWorkerItem } from '../../../widgets/ReplaceWorkerWidget/ReplaceWorkerItem';
import { blockPerson, dischargePerson, jobTitlePerson, personsMapper } from '../../../entities/persons/model/selectors/persons';
import { useLocation } from 'react-router-dom';
import type { Brigade, BrigadesDto } from '../../../entities/brigades/types/brigades.dto';
import type { SortShift } from '../../../entities/shifts/types/shifts.dto';
import { useCheckPersonStatus } from '../../../features/hooks/useCheckPersonStatus';
import type { RootState } from '../../../app/store/store';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { brigadesSortArr } from '../../../entities/brigades/model/selectors/brigades';
import { useGetBrigadesQuery } from '../../../entities/brigades/api/getBrigades';

export interface filterSelected {
    brigadesId: string[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

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

    const [inputText, onInputText] = useState<string>('');
    const [modal, onModal] = useState<boolean>(false);
    const [filterApply, onfilterApply] = useState<boolean>(false);

    const [filters, onFilters] = useState<filterSelected>({
        brigadesId: [],
        jobTitle: [],
        block: [],
        discharge: []
    });

    const filteredPeople = peopleWithStatus.filter((person) => {
        
        if(filterApply === true){

            const brigadeMatch =
                filters.brigadesId.length === 0 ||
                (person.brigade_id !== null &&
                    filters.brigadesId.includes(person.brigade_id));

            const jobTitleMatch =
                filters.jobTitle.length === 0 ||
                filters.jobTitle.includes(person.job_title);

            const blockMatch =
                filters.block.length === 0 ||
                filters.block.includes(person.block);

            const dischargeMatch =
                filters.discharge.length === 0 ||
                filters.discharge.includes(person.discharge);

            return (
                brigadeMatch &&
                jobTitleMatch &&
                blockMatch &&
                dischargeMatch
            );

             
        }

        const searchWords = inputText
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);

        if (!searchWords.length) {
            return true;
        }

        const fio = [
            person.surname,
            person.name,
            person.other_surname,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        return searchWords.every((word) => fio.includes(word));
    });    
    
    return (

        <main
            className={styles["userChange"]}
        >
            
            <ReplaceWorkerProcess
                selectedPerson={selectedPerson}
                person={personToReplace}
                arrProblem={arrProblemPersonToReplace}
                brigadeName={brigadeName}
                shift={shift}
            />

            <section>

                <article
                    className={styles["userChange__filters"]}
                >

                    <div
                        className={styles["userChange__search"]}
                    >
                        <div
                            className={styles["userChange__search-icon"]}
                        >
                            <Search/>
                        </div>

                        <input
                            className={styles["userChange__search-input"]}
                            placeholder='Поиск по ФИО'
                            value={inputText}
                            onChange={(e) => onInputText(e.target.value)}
                        />
                    </div>

                    <button
                        className={styles["userChange__buttonFilter"]}
                        onClick={() => onModal(!modal)}
                    >
                        <Menu className={styles["userChange__button-icon"]} />

                        <span className={styles["userChange__button-text"]}>
                            Фильтры
                        </span>

                    </button>

                </article>

            </section>

            <section
                className={styles["userChange__buttonsCategoryes"]}
            >

                {Object.entries(filters).map(([key, value]) => {

                    if (!value || value.length === 0) return null;

                    if (key === 'brigadesId') {
                        
                        const selectedBrigades: Brigade[] = brigadesArr.filter((b) => value.includes(b.id))
                        
                        return (
                            
                            <div
                                className={styles["userChange__buttonsCategoryes-block"]}
                            >

                                {selectedBrigades.map((b) => (
                                    
                                    <span
                                        key={b.id}
                                        className={styles["userChange__buttonsCategoryes-button"]}
                                    >

                                        {b.name}

                                    </span>
                                ))}

                            </div>
                        )
                    }else {
                        return (
                            <div 
                                key={key}
                                className={styles["userChange__buttonsCategoryes-block"]}
                            >

                                {value.map((v: string | number) => (

                                    <span
                                        key={v}
                                        className={styles["userChange__buttonsCategoryes-button"]}
                                    >

                                        {v}

                                    </span>

                                ))}
                                
                            </div>
                        );
                    }
                })}


            </section>

            <section
            >

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