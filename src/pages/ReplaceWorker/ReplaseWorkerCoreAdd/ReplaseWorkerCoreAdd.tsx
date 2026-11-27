import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from './ReplaseWorkerCoreAdd.module.scss';
import { WorkerReplaceFactory } from '@/shared/ui/WorkerReplace/WorkerReplaceFactory';
import { useGetPesonsQuery } from '@/entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '@/entities/brigades/api/getBrigades';
import { useGetPersonReplacementQuery } from '@/entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '@/entities/shifts/api/getShifts';
import { filterOptionsSelector, peopelSortForHisBrigades, peopleMapWhereKeyItsPersonIdReplaseWorkerCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/model/modelReplaseWorkerCoreAdd';
import { brigadesMapper } from '@/entities/brigades/model/selectors/mapperBrigades';
import { FiltersFactory } from '@/shared/ui/Filters/FiltersFactory';
import { useFilteredPeopelSort } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/hooks/useFilteredPeopelSort';
import { useSelectedWorkerReplacement } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/hooks/useSelectedWorkerReplacement';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';

export function ReplaseWorkerCoreAdd () {

    const [searchParams] = useSearchParams();

    const brigadeIdParam: string | null = searchParams.get("brigadeId");
    const isCorePageParam: boolean = searchParams.get("isCorePage") === "true";

    if (!brigadeIdParam || !isCorePageParam) {
        return <div>Некорректные параметры страницы</div>;
    }

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    // Селекторы
    const peopleMap = useSelector(peopleMapWhereKeyItsPersonIdReplaseWorkerCoreAdd) as Map<string, Persons>;
    const peopelSort = useSelector(peopelSortForHisBrigades);
    const brigadesArr = useSelector(brigadesMapper);
    const filterOptions = useSelector(filterOptionsSelector);
  
    const {

        filters,
        setFilters,

        filteredPeopelSort,

        isOpenModalFilters,
        setIsOpenModalFilters,

        applyFunctionFilters,
        resetFunctionFilters

    } = useFilteredPeopelSort({
        peopelSort
    })

    const {
        selectNewWorker,
        setSelectNewWorker,
        newWorkerObj
    } = useSelectedWorkerReplacement({
        peopleMap,
        brigadeIdParam
    });

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
                className={styles["userChange__title"]}
            >
                <span>
                    Замена постоянного сотрудника
                </span>       
            </h4>
            
            {WorkerReplaceFactory.workerReplaceBlockWithOutProblems({
                currentWorker: null,
                newWorker: newWorkerObj
            })}

            {FiltersFactory.filterReplaceCoreStaff({

                isOpenModalFilterReplaceCoreStaff: isOpenModalFilters,
                setIsOpenModalFilterReplaceCoreStaff: setIsOpenModalFilters,

                filters: filters,
                setFilters: setFilters,

                brigades: brigadesArr,
                jobTitles: filterOptions.jobTitles,
                blocks: filterOptions.blocks,
                discharges: filterOptions.discharges,

                apply: applyFunctionFilters,
                reset: resetFunctionFilters
            })}

            <section
                className={styles['userChange__brigadePeopleList']}
            >

                {filteredPeopelSort.map((brigade) => {

                    const b = brigadesArr.find(
                        (b) => b.id === brigade.brigadeId
                    );

                    return (

                        <article
                            className={styles['userChange__brigadePeopleList-brigade']}
                        >

                            <h3
                                className={styles['userChange__brigadePeopleList-brigade-title']}
                            >
                                <span>

                                    {b?.name ?? null
                                        ? b?.name
                                        : 'Без бригады'
                                            
                                    }

                                </span>
                            </h3>

                            {brigade.people.map((person) => (

                                WorkItemCardFactory.workItemCardActionOne({
                                    id: person.id,
                                    name: person.name,
                                    surname: person.surname,
                                    otherSurname: person.other_surname,
                                    job_title: person.job_title,
                                    block: person.block,
                                    discharge: person.discharge,
                                    avalibleBlocks: person.he_can ?? [],

                                    objectSelectUser: selectNewWorker,
                                    onObjectSelectUser: setSelectNewWorker,

                                })

                            ))}

                        </article>
                    );

                })}
                
            </section>

        </main>
    )
} 