import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ReplaseWorker.module.scss';
import { WorkerReplaceFactory } from '@/shared/ui/WorkerReplace/WorkerReplaceFactory';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '@/entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '@/entities/brigades/api/getBrigades';
import { useGetPersonReplacementQuery } from '@/entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '@/entities/shifts/api/getShifts';
import type { ObjectSelectUserReplaseWorkerCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/types/typesReplaseWorkerCoreAdd';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import type { SortShift } from '@/entities/shifts/types/shifts.dto';
import { sortShiftMap } from '@/pages/Home/adminPage/model/selectorsAdminPage';
import { supabase } from '@/shared/api/supabase/client';
import { BrigadePeopleSection } from '@/pages/ReplaceWorker/ReplaseWorker/widgets/BrigadePeopleSection/BrigadePeopleSection';

export function ReplaseWorker () {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const personId: string | null = searchParams.get("personId");
    const brigadeIdParam: string | null = searchParams.get("brigadeId");
    const isSimpleReplaceWorker: boolean = searchParams.get("isSimpleReplaceWorker") === "true";
    const dateStore: string = searchParams.get("date") ?? '';

    if (
        !brigadeIdParam || 
        !isSimpleReplaceWorker
    ) {
        return <div>Некорректные параметры страницы</div>;
    }

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    // метод для хуков
    async function refetchData() {
        personsQuery.refetch();
        brigadesQuery.refetch();
        personReplacementQuery.refetch();
        shiftQuery.refetch();
    };

    // Селекторы
    const shiftsMap: Map<string, SortShift[]> = useSelector(sortShiftMap);

    const shiftsToday: SortShift[] = shiftsMap.get(dateStore) ?? [];

    const currentBrigade = shiftsToday.find(
        shift => shift.brigade.id === brigadeIdParam
    );

    const currentWorkerWithProblems = currentBrigade?.peopleOnThisDay.find(
        person => person.id === personId
    );

    console.log(currentWorkerWithProblems)

    if (
        !currentWorkerWithProblems 
    ) {
        return <div>Некорректные параметры страницы</div>;
    }
    
    const russianDate: string = `${dateStore.slice(8, 10)}-${dateStore.slice(5,7)}-${dateStore.slice(0,4)}`

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // состояние где хранится id человека 
    // на которого кликнул пользователь
    const [selectNewWorker, setSelectNewWorker] = useState<ObjectSelectUserReplaseWorkerCoreAdd | null>(null);

    console.log(selectNewWorker)
    const [apply, setApply] = useState<boolean>(false);

    const currentWorkerObj = {
        id: currentWorkerWithProblems.id,
        name: currentWorkerWithProblems.name,
        surname: currentWorkerWithProblems.surname,
        otherSurname: currentWorkerWithProblems.other_surname,
        numberBrigade: currentWorkerWithProblems.brigade_name?.number_brigade ?? null,
        jobTitle: currentWorkerWithProblems.job_title,
        block: currentWorkerWithProblems.block,
        discharge: currentWorkerWithProblems.discharge,
        avalibleBlocks: currentWorkerWithProblems.he_can ?? [],
        objectSelectUser: selectNewWorker,
        setApply: setApply,
        redAlarm: currentWorkerWithProblems.redAlarm ?? [],
        yellowAlarm: currentWorkerWithProblems.yellowAlarm ?? [],
    }

    console.log(currentWorkerObj.redAlarm)

   const newWorker: Persons | null = selectNewWorker
    ? shiftsToday
        .flatMap((f) => [
            ...f.peopleOnThisDay,
            ...(f.peopleWithoutBrigade ?? [])
        ])
        .find((person) => person.id === selectNewWorker.id) ?? null
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
            setApply: setApply,
            redAlarm: newWorker.redAlarm ?? [],
            yellowAlarm: newWorker.yellowAlarm ?? [],
        }
    : null;

    console.log(newWorkerObj?.redAlarm ?? null)

 
    useEffect(() => {

        if (
            !apply || 
            !newWorker || 
            !brigadeIdParam || 
            !personId
        ) {
            return;
        }

        async function updatePersonBrigade (){

            if (!newWorker) return;

            try {

                setIsLoading(true);

                const { error } = await supabase
                    .from('person_replacements')
                    .insert({
                        date: dateStore,
                        person_who_was_replaced_id: personId,
                        person_who_was_replaced_brigade_id: brigadeIdParam,
                        person_replaced_id: newWorker.id,
                        person_replaced_brigade_id: newWorker.brigade_id
                    })
                ;

                if (error) {
                    throw error;
                }

                await refetchData();

                navigate('/');

            } catch (error) {

                console.error(
                    'Ошибка при добавлении замены:',
                    error
                );

            } finally {

                setSelectNewWorker(null);
                setIsLoading(false);
                setApply(false);

            }

        };

        updatePersonBrigade();

    }, [
        apply,
        newWorker,
        brigadeIdParam,
        personId,
        dateStore,
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
                    Замена сотрудника на: {russianDate}
                </span>       
            </h4>
            
            {WorkerReplaceFactory.workerReplaceBlockWithProblems({
                currentWorker: currentWorkerObj,
                newWorker: newWorkerObj
            })}

            {(shiftsToday[0]?.personsRemovedFromBrigade && 
              shiftsToday[0]?.personsRemovedFromBrigade.length > 0) &&  (
                <BrigadePeopleSection
                    personIdParam={personId}
                    key="personsRemovedFromBrigade"
                    brigade={{
                        brigadeId: 'no_brigade',
                        people: shiftsToday[0].personsRemovedFromBrigade
                    }}
                    brigadeName={'Замененый человек'}
                    selectNewWorker={selectNewWorker}
                    setSelectNewWorker={setSelectNewWorker}
                />
            )}

            {(shiftsToday[0]?.peopleWithoutBrigade && 
              shiftsToday[0]?.peopleWithoutBrigade.length > 0 ) && (
                <BrigadePeopleSection
                    key="no_brigade"
                    personIdParam={personId}
                    brigade={{
                        brigadeId: 'no_brigade',
                        people: shiftsToday[0].peopleWithoutBrigade
                    }}
                    brigadeName={'Без бригады'}
                    selectNewWorker={selectNewWorker}
                    setSelectNewWorker={setSelectNewWorker}
                />
            )}

            {shiftsToday.map((shift) => {

                const brigadeName = shift.brigade.name;

                return (
                    <BrigadePeopleSection
                        personIdParam={personId}
                        key={shift.brigade.id}
                        brigade={{
                            brigadeId: shift.brigade.id,
                            people: shift.peopleOnThisDay
                        }}
                        brigadeName={brigadeName}
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