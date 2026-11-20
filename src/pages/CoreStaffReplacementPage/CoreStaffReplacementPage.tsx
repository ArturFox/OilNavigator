import { useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import styles from './CoreStaffReplacementPage.module.scss';
import { brigadeSortArrCoreStaffReplacement, peopleMapCoreStaffReplacement, peopleMapIdKeyCoreStaffReplacement } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { useSwipe } from '@/pages/CoreStaffReplacementPage/hooks/useSwipe';
import { BrigadeNavigationRow } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/BrigadeNavigationRow/BrigadeNavigationRow';
import { BrigadeToolbar } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeToolbar/BrigadeToolbar';
import { BrigadeWorkersSlider } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeWorkersSlider/BrigadeWorkersSlider';
import { useBrigadeDelete } from '@/pages/CoreStaffReplacementPage/hooks/useBrigadeDelete';
import { useManageSeveralWorkItemCards } from '@/pages/CoreStaffReplacementPage/hooks/useManageSeveralWorkItemCards';
import { useBrigadeCreate } from '@/pages/CoreStaffReplacementPage/hooks/useBrigadeCreate';
import { useManageOnlyOneWorkItemCards } from '@/pages/CoreStaffReplacementPage/hooks/useManageOnlyOneWorkItemCards';
import { useRedirectEmptyCard } from '@/pages/CoreStaffReplacementPage/hooks/useRedirectEmptyCard';

export function CoreStaffReplacementPage() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    // селекторы
    const brigadeSortArr = useSelector(brigadeSortArrCoreStaffReplacement) as Brigade[];
    const peopleMap = useSelector(peopleMapCoreStaffReplacement) as Map<string, Persons[]>;
    const peopleMapIdKey = useSelector(peopleMapIdKeyCoreStaffReplacement) as Map<string, Persons>;

    // метод для хуков
    const refetchData = () => {
        personsQuery.refetch();
        brigadesQuery.refetch();
        personReplacementQuery.refetch();
        shiftQuery.refetch();
    };

    // хук для свайпа влево и вправо
    const {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        currentIndex,
        isbrigadeSelectId,
        setIsbrigadeSelectId
    } = useSwipe({
        brigadesArr: brigadeSortArr,
    });

    // хук для управления ModalReplaceOnlyOne
    const {

        setIsApplymodalReplaceOnlyOne

    } = useManageOnlyOneWorkItemCards({
        refetchData
    })

    // хук для управления ModalReplaceSeveralSelect
    const {

        isButtonSelectCheck,
        setIsButtonSelectCheck,

        isListSelectedUsers,
        setIsListSelectedUsers,

        isOpenModalSeveral,
        setIsOpenModalSeveral, 

        setIsApplymodalReplaceSeveral,

    } = useManageSeveralWorkItemCards({
        refetchData
    })

    // хук для WorkItemCardActionEmpty
    const {
        isShouldRedirect,
        setIsShouldRedirect,
        setIsTargetBrigadeId
    } = useRedirectEmptyCard();

    // хук для создания новой бригады
    const {

        setIsCreateNewBrigade,
        isModalWhereCreateNewBrigade,
        setIsModalWhereCreateNewBrigade,
        isLoadingCreateNewBrigade

    } = useBrigadeCreate({
        installationId: brigadeSortArr[0].installation_id,
        refetchData
    })

    // хук для удаления бригады
    const {

        isModalWhereDeleteBrigade,
        setIsModalWhereDeleteBrigade,
        isLoadingDeleteBrigade,
        setIsBrigadeIdDeleteBrigade,

    } = useBrigadeDelete({
        peopleMap,
        refetchData,
    });

    // Для отображания в ModalReplaceSeveralSelect списка выбранных людей
    const selectedPeople = isListSelectedUsers.map((personId) => {

        const person: Persons = peopleMapIdKey.get(personId)!;

        return {
            id: person.id,
            name: person.name,
            surname: person.surname,
        };

    });

    // Нужен чтобы отображать в модалках список бригад
    const brigadesIdAndNumbers = brigadeSortArr.map((brigade) => ({
        brigadeId: brigade.id,
        brigadeNumber: brigade.number_brigade,
    }));

    // Для отображения списка бригад в BrigadeNavigationRow
    const brigadeList = brigadeSortArr.map((brigade) => {

        const currentPeople = peopleMap.get(brigade.id) ?? [];

        return {
            id: brigade.id,
            numberBrigade: brigade.number_brigade,
            isFull: currentPeople.length >= 7,
        };

    });
    
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
            
            <BrigadeNavigationRow

                // хук useSwipe
                isbrigadeSelectId={isbrigadeSelectId}
                setIsBrigadeSelectId={setIsbrigadeSelectId}

                // хук useBrigadeCreate
                isModalWhereCreateNewBrigade={isModalWhereCreateNewBrigade}
                setIsModalWhereCreateNewBrigade={setIsModalWhereCreateNewBrigade}
                isLoadingCreateNewBrigade={isLoadingCreateNewBrigade}
                setIsCreateNewBrigade={setIsCreateNewBrigade}

                // хук useBrigadeDelete
                isModalWhereDeleteBrigade={isModalWhereDeleteBrigade}
                setIsModalWhereDeleteBrigade={setIsModalWhereDeleteBrigade}
                isLoadingDeleteBrigade={isLoadingDeleteBrigade}
                setIsBrigadeIdDelete={setIsBrigadeIdDeleteBrigade}

                // Нужен чтобы отображать в модалках список бригад
                brigadesIdAndNumbers={brigadesIdAndNumbers}

                // Для отображения списка бригад
                brigadeList={brigadeList}
            />
            
            <BrigadeToolbar

                // получаем название бригады
                currentNameBrigade={brigadeSortArr[currentIndex].name}

                buttonSelectCheck={isButtonSelectCheck}
                listSelectedUsers={isListSelectedUsers}
                onListSelectedUsers={setIsListSelectedUsers}
                openModalSeveral={isOpenModalSeveral}
                onOpenModalSeveral={setIsOpenModalSeveral}
                onButtonSelectCheck={setIsButtonSelectCheck}
            />

            <BrigadeWorkersSlider

                // хук useSwipe
                currentIndex={currentIndex}
                dragOffset={dragOffset}
                isDragging={isDragging}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}

                // хук useManageSeveralWorkItemCards
                isButtonSelectCheck={isButtonSelectCheck}

                listSelectedUsers={isListSelectedUsers}
                setListSelectedUsers={setIsListSelectedUsers}

                isOpenModalSeveral={isOpenModalSeveral}
                setIsOpenModalSeveral={setIsOpenModalSeveral}

                setIsApplymodalReplaceSeveral={setIsApplymodalReplaceSeveral}
                
                // хук useManageOnlyOneWorkItemCards
                setIsApplymodalReplaceOnlyOne={setIsApplymodalReplaceOnlyOne}

                // хук useRedirectEmptyCard
                isShouldRedirect={isShouldRedirect}
                setIsShouldRedirect={setIsShouldRedirect}
                setTargetBrigadeId={setIsTargetBrigadeId}

                // Передаем массив бригад, по которому формируются слайды 
                // и распределяются сотрудники в соответствии с их brigade_id
                brigadeSortArr={brigadeSortArr}

                // Передаём сотрудников, распределённых по своим бригадам (ключ — ID бригады)
                peopleMap={peopleMap}

                // Нужен чтобы отображать в модалках список бригад
                brigadesIdAndNumbers={brigadesIdAndNumbers}

                // Для отображания в ModalReplaceSeveralSelect списка выбранных людей
                arrSelectButton={selectedPeople}
            />  

        </main>

    );

}