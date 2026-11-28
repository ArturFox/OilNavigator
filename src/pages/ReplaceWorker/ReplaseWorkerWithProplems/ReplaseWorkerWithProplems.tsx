import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from './ReplaseWorker.module.scss';
import { WorkerReplaceFactory } from '@/shared/ui/WorkerReplace/WorkerReplaceFactory';
import { useGetPesonsQuery } from '@/entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '@/entities/brigades/api/getBrigades';
import { useGetPersonReplacementQuery } from '@/entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '@/entities/shifts/api/getShifts';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import type {  SortShift, SortShiftDay } from '@/entities/shifts/types/shifts.dto';
import { sortShiftMap } from '@/pages/Home/adminPage/model/selectorsAdminPage';
import { BrigadePeopleSection } from '@/pages/ReplaceWorker/ReplaseWorkerWithProplems/widgets/BrigadePeopleSection/BrigadePeopleSection';
import type { Persons } from '@/entities/persons/types/persons.dto';
import { useSelectedWorkerReplace } from '@/pages/ReplaceWorker/ReplaseWorkerWithProplems/hooks/useSeletedWorkerReplace';

export function ReplaseWorkerWithProplems () {

    // Получаем параметры из url
    const [searchParams] = useSearchParams();

    const personId: string | null = searchParams.get("personId");
    const brigadeIdParam: string | null = searchParams.get("brigadeId");
    const dateStore: string = searchParams.get("date") ?? '';

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personsReplacementQuery = useGetPersonReplacementQuery();
    const shiftsQuery = useGetShiftsQuery();

    // метод для хуков
    async function refetchData() {
        personsQuery.refetch();
        brigadesQuery.refetch();
        personsReplacementQuery.refetch();
        shiftsQuery.refetch();
    };

    // Загрузка данных 
    const isLoading: boolean =
        personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        shiftsQuery.isLoading ||
        personsReplacementQuery.isLoading
    ;

    // Российская дата
    const russianDate: string = `${dateStore.slice(8, 10)}-${dateStore.slice(5,7)}-${dateStore.slice(0,4)}`

    // Селекторы
    const shiftsMap: Map<string, SortShiftDay> = useSelector(sortShiftMap);

    // Получаем смены по выбранному дню
    const shiftsToday: SortShiftDay | null = shiftsMap.get(dateStore) ?? null;

    // Ищем бригаду и пользователя которого выбрали под замену
    const currentBrigade: SortShift | null = shiftsToday?.shifts.find(
        shift => shift.brigade.id === brigadeIdParam
    ) ?? null;
    const currentWorkerWithProblems: Persons | null = currentBrigade?.peopleOnThisDay.find(
        person => person.id === personId
    ) ?? null;

    const {
        currentWorkerObj,
        newWorkerObj,
        isLoadingReplacePerson,
        isSelectedNewWorker,
        setIsSelectedNewWorker,
    } = useSelectedWorkerReplace({
        currentWorkerWithProblems,
        shiftsToday,
        isLoading,
        refetchData,
        personId,
        brigadeIdParam,
        dateStore
    });

    // Пока загружаются данные API — показываем загрузку
    if (isLoading) {
        return (
            <div>
                грузится
            </div>
        );
    }

    // Проверяем наличие найденной бригады и сотрудника
    if (
        !currentWorkerWithProblems ||
        !currentBrigade ||
        !shiftsToday
    ) {
        return <div>Некорректные параметры страницы</div>;
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

            {(shiftsToday?.personsRemovedFromBrigade.length ?? 0) > 0 && (
                <BrigadePeopleSection
                    personIdParam={personId}
                    key="personsRemovedFromBrigade"
                    brigade={{
                        brigadeId: 'no_brigade',
                        people: shiftsToday!.personsRemovedFromBrigade
                    }}
                    brigadeName={'Замененый человек'}
                    selectNewWorker={isSelectedNewWorker}
                    setSelectNewWorker={setIsSelectedNewWorker}
                />
            )}

            {(shiftsToday?.personsWithoutBrigade.length ?? 0) > 0 && (
                <BrigadePeopleSection
                    key="no_brigade"
                    personIdParam={personId}
                    brigade={{
                        brigadeId: 'no_brigade',
                        people: shiftsToday!.personsWithoutBrigade
                    }}
                    brigadeName={'Без бригады'}
                    selectNewWorker={isSelectedNewWorker}
                    setSelectNewWorker={setIsSelectedNewWorker}
                />
            )}

            {shiftsToday?.shifts.map((shift) => {

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
                        selectNewWorker={isSelectedNewWorker}
                        setSelectNewWorker={setIsSelectedNewWorker}
                    />
                );

            })}

            {isLoadingReplacePerson && 
                LayoutFactory.layoutSimpleBlackBackground({
                    isLoading: isLoadingReplacePerson
                })
            }

        </main>
    )
} 