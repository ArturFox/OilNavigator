import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ReplaseWorkerCoreAdd.module.scss';
import { WorkerReplaceFactory } from '@/shared/ui/WorkerReplace/WorkerReplaceFactory';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '@/entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '@/entities/brigades/api/getBrigades';
import { useGetPersonReplacementQuery } from '@/entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '@/entities/shifts/api/getShifts';
import type { ObjectSelectUserReplaseWorkerCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/types/typesReplaseWorkerCoreAdd';
import { peopelSortForHisBrigades, peopleMapWhereKeyItsPersonIdReplaseWorkerCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/model/modelReplaseWorkerCoreAdd';
import { brigadesMapper } from '@/entities/brigades/model/selectors/mapperBrigades';
import { useChangePersonBrigadeMutation } from '@/entities/persons/api/getPersons';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { BrigadePeopleSectionCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/widgets/BrigadePeopleSectionCoreAdd/BrigadePeopleSectionCoreAdd';

export function ReplaseWorkerCoreAdd () {

    const navigate = useNavigate();
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

    const [changePersonBrigade] = useChangePersonBrigadeMutation();

    // Селекторы
    const peopleMap = useSelector(peopleMapWhereKeyItsPersonIdReplaseWorkerCoreAdd) as Map<string, Persons>;
    const peopelSort = useSelector(peopelSortForHisBrigades);
    const brigadesArr = useSelector(brigadesMapper);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // состояние где хранится id человека 
    // на которого кликнул пользователь
    const [selectNewWorker, setSelectNewWorker] = useState<ObjectSelectUserReplaseWorkerCoreAdd | null>(null);

    const [apply, setApply] = useState<boolean>(false);

    const newWorker: Persons | null = selectNewWorker 
    ? peopleMap.get(selectNewWorker.id) ?? null
    : null;

    const newWorkerObj = newWorker
    ?  {
            id: newWorker.id,
            name: newWorker.name,
            surname: newWorker.surname,
            otherSurname: newWorker.other_surname,
            numberBrigade: newWorker.brigade_name?.number_brigade ?? null,
            jobTitle: newWorker.job_title,
            block: newWorker.block,
            discharge: newWorker.discharge,
            avalibleBlocks: newWorker.he_can ?? [],
            objectSelectUser: selectNewWorker,
            setApply: setApply
        }
    : null;
 
    useEffect(() => {

        if (!apply || !newWorker || !brigadeIdParam) {
            return;
        }

        const updatePersonBrigade = async () => {

            try {

                setIsLoading(true);

                await changePersonBrigade({
                    idPerson: newWorker.id,
                    idClickNewBrigade: brigadeIdParam
                }).unwrap();

                await personsQuery.refetch();

                setIsLoading(false);

                setApply(false);

                navigate('/scheduleChangePage');

            } catch (error) {
                console.error(
                    'Ошибка при добавлении сотрудника в бригаду:',
                    error
                );

                setApply(false);
            }
        };

        updatePersonBrigade();

    }, [
        apply,
        newWorker,
        brigadeIdParam,
        changePersonBrigade,
        personsQuery.refetch,
        navigate
    ]);

    useEffect(() => {

        if(!selectNewWorker){
            return
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }, [selectNewWorker])

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

            {peopelSort.map((brigade) => {

                const b = brigadesArr.find(
                    (b) => b.id === brigade.brigadeId
                );

                return (
                    <BrigadePeopleSectionCoreAdd
                        key={brigade.brigadeId}
                        brigade={brigade}
                        brigadeName={b?.name ?? null}
                        selectNewWorker={selectNewWorker}
                        setSelectNewWorker={setSelectNewWorker}
                    />
                );

            })}

            {isLoading && 
                LayoutFactory.layoutSimpleBlackBackground({
                    isLoading: isLoading
                })
            }

        </main>
    )
} 