import { useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import styles from './CoreStaffReplacementPage.module.scss';
import { brigadeSortArrCoreStaffReplacement, peopleMapCoreStaffReplacement, peopleMapIdKeyCoreStaffReplacement } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { useEffect, useState } from 'react';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { useSwipe } from '@/hooks/useSwipe';
import { useNavigate } from 'react-router-dom';
import { BrigadeNavigationRow } from '@/shared/ui/BrigadeNavigation/BrigadeNavigationRow/BrigadeNavigationRow';
import { BrigadeToolbar } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeToolbar/BrigadeToolbar';
import { BrigadeWorkersSlider } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeWorkersSlider/BrigadeWorkersSlider';
import { useBrigadeDelete } from '@/pages/CoreStaffReplacementPage/hooks/useBrigadeDelete';
import { useSeveralPeopleReplacement } from '@/pages/CoreStaffReplacementPage/hooks/useSeveralPeopleReplacement';
import { useBrigadeCreate } from '@/pages/CoreStaffReplacementPage/hooks/useBrigadeCreate';
import { useBrigadeReplacement } from '@/pages/CoreStaffReplacementPage/hooks/useBrigadeReplacement';

export function CoreStaffReplacementPage() {

    const navigate = useNavigate();

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

    // состояния
    const [listSelectedUsers, onListSelectedUsers] = useState<string[]>([]);
    const [isbrigadeSelectId, setIsbrigadeSelectId] = useState<string>('no_brigade');

    // обработчик свайпа
    const currentIndex: number = brigadeSortArr.findIndex(
        (brigade) => brigade.id === isbrigadeSelectId
    );

    const currentNameBrigade: string = brigadeSortArr[currentIndex].name; 

    const brigadesIdAndNumbers = brigadeSortArr.map((brigade) => ({
        brigadeId: brigade.id,
        brigadeNumber: brigade.number_brigade,
    }));

    const selectedPeople: Persons[] = listSelectedUsers.map(
        
        (personId) => peopleMapIdKey.get(personId)!

    );

    const brigadeList = brigadeSortArr.map((brigade) => {

        const currentPeople = peopleMap.get(brigade.id) ?? [];

        return {
            id: brigade.id,
            numberBrigade: brigade.number_brigade,
            isFull: currentPeople.length >= 7,
        };
    });

    const {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useSwipe({
        currentIndex,
        brigadesArr: brigadeSortArr,
        onBrigadeClick: setIsbrigadeSelectId,
    });

    const {
        setIsBrigadeReplacement
    } = useBrigadeReplacement({
        refetchData
    })

    const {
        isButtonSelectCheck,
        setIsButtonSelectCheck,
        isOpenModalSeveral,
        setIsOpenModalSeveral,
        setIsBrigadeId: setIsBrigadeIdSeveral
    } = useSeveralPeopleReplacement({
        listSelectedUsers,
        onListSelectedUsers,
        refetchData
    })

    const {
        isCreateModal,
        setIsCreateModal,
        setIsCreateNewBrigade
    } = useBrigadeCreate({
        installationId: brigadeSortArr[0].installation_id,
        refetchData
    })

    const {
        isDeleteModal,
        setIsDeleteModal,
        isLoading: isLoadingDelete,
        setIsBrigadeId: setIsBrigadeIdDelete
    } = useBrigadeDelete({
        peopleMap,
        refetchData,
    });

    // состояния для перехода на др страницу
    // первое состояние чтобы при нажатии на кнопку поменять флааг и запустить useEffect
    // второе состоняие чтобы передать id бригады, в какой бригаде будет замена 
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [targetBrigadeId, setTargetBrigadeId] = useState<string | null>(null);
    useEffect(() => {

        if(!shouldRedirect && targetBrigadeId === null){
            return;
        }

        navigate(`/userChange?personId=${null}&brigadeId=${targetBrigadeId}&date=${null}&isCorePage=${String(true)}`);
        
    }, [shouldRedirect, setShouldRedirect, targetBrigadeId, setTargetBrigadeId])
    
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
                brigadeList={brigadeList}
                isbrigadeSelectId={isbrigadeSelectId}
                setIsBrigadeSelectId={setIsbrigadeSelectId}
                setIsDelete={setIsDeleteModal}
                setIsCreate={setIsCreateModal}
            />
            
            <BrigadeToolbar
                currentNameBrigade={currentNameBrigade}
                buttonSelectCheck={isButtonSelectCheck}
                listSelectedUsers={listSelectedUsers}
                onListSelectedUsers={onListSelectedUsers}
                openModalSeveral={isOpenModalSeveral}
                onOpenModalSeveral={setIsOpenModalSeveral}
                onButtonSelectCheck={setIsButtonSelectCheck}
            />

            <BrigadeWorkersSlider
                currentIndex={currentIndex}
                dragOffset={dragOffset}
                isDragging={isDragging}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                brigadeSortArr={brigadeSortArr}
                peopleMap={peopleMap}
                shouldRedirect={shouldRedirect}
                setShouldRedirect={setShouldRedirect}
                setTargetBrigadeId={setTargetBrigadeId}
                listSelectedUsers={listSelectedUsers}
                onListSelectedUsers={onListSelectedUsers}
                buttonSelectCheck={isButtonSelectCheck}
                brigadesIdAndNumbers={brigadesIdAndNumbers}
                onApply={setIsBrigadeReplacement}
            />

            {isButtonSelectCheck && isOpenModalSeveral &&
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isOpenModalSeveral,
                    onIsOpenModal: setIsOpenModalSeveral,
                    children: (
                        <ModalFactory.modalReplaceSeveralSelect
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            arrSelectButton={selectedPeople}
                            setIsApllyModalSeveral={setIsBrigadeIdSeveral}
                        />
                    )
                })
            }

            {isCreateModal &&
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isCreateModal,
                    onIsOpenModal: setIsCreateModal,
                    children: (
                        <ModalFactory.modalAddBrigade
                            onApply={setIsCreateNewBrigade}
                        />
                    )
                })
            }

            {isDeleteModal && 
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isDeleteModal,
                    onIsOpenModal: setIsDeleteModal,
                    children:  (
                        <ModalFactory.modalDeleteBrigade
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            isLoadingDelete={isLoadingDelete}
                            onApply={setIsBrigadeIdDelete}
                        />
                    )
                })
            }

        </main>

    );

}