import type { BrigadeNavigationRowProps } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/BrigadeNavigationRow/types/typesBrigadeNavigationRow';
import styles from './BrigadeNavigationRow.module.scss';
import { ButtonItemDeleteBrigade } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/widgets/ButtonItemDeleteBrigade/ButtonItemDeleteBrigade';
import { ButtonItemCreateBrigade } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/widgets/ButtonItemCreateBrigade/ButtonItemCreateBrigade';
import { ButtonItemExistBrigade } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/widgets/ButtonItemExistBrigade/ButtonItemExistBrigade';
import { ButtonItemNoBrigade } from '@/pages/CoreStaffReplacementPage/widgets/BrigadeNavigation/widgets/ButtonItemNoBrigade/ButtonItemNoBrigade';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';

export function BrigadeNavigationRow (
    {

        // хук useSwipe
        isbrigadeSelectId,
        setIsBrigadeSelectId,

        // хук useBrigadeCreate
        isModalWhereCreateNewBrigade,
        setIsModalWhereCreateNewBrigade,
        isLoadingCreateNewBrigade,
        setIsCreateNewBrigade,

        // хук useBrigadeDelete
        isModalWhereDeleteBrigade,
        setIsModalWhereDeleteBrigade,
        isLoadingDeleteBrigade,
        setIsBrigadeIdDelete,

        // Нужен чтобы отображать в модалках список бригад
        brigadesIdAndNumbers,

        // Для отображения списка бригад
        brigadeList,


    }:BrigadeNavigationRowProps
) {

    return (
        
        <section>

            <ul
                className={styles['brigadeNavigationRow']}
            >

                {brigadeList.map((brigade) => {

                    const currentBrigade: boolean = isbrigadeSelectId === brigade.id

                    if (brigade.id === 'no_brigade') {

                        return (

                            <ButtonItemNoBrigade
                                key={'no_brigade'}
                                currentBrigade={currentBrigade}
                                setIsBrigadeSelectId={setIsBrigadeSelectId}
                            />

                        );

                    }
                    
                    return (

                        <ButtonItemExistBrigade
                            key={brigade.id}
                            isFull={brigade.isFull}
                            id={brigade.id}
                            currentBrigade={currentBrigade}
                            numberBrigade={brigade.numberBrigade}
                            setIsBrigadeSelectId={setIsBrigadeSelectId}
                        />

                    )

                })}

                <ButtonItemCreateBrigade
                    key={'ButtonItemCreateBrigade'}
                    setIsCreate={setIsModalWhereCreateNewBrigade}
                />

                <ButtonItemDeleteBrigade
                    key={'ButtonItemDeleteBrigade'}
                    setIsDelete={setIsModalWhereDeleteBrigade}
                />
                    
            </ul>

            {isModalWhereCreateNewBrigade &&
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isModalWhereCreateNewBrigade,
                    onIsOpenModal: setIsModalWhereCreateNewBrigade,
                    children: (
                        <ModalFactory.modalCreateBrigade
                            onApply={setIsCreateNewBrigade}
                            isLoadingCreateNewBrigade={isLoadingCreateNewBrigade}
                        />
                    )
                })
            }

            {isModalWhereDeleteBrigade && 
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isModalWhereDeleteBrigade,
                    onIsOpenModal: setIsModalWhereDeleteBrigade,
                    children:  (
                        <ModalFactory.modalDeleteBrigade
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            isLoadingDelete={isLoadingDeleteBrigade}
                            onApply={setIsBrigadeIdDelete}
                        />
                    )
                })
            }
            
        </section>

    )
    
} 