import { ButtonFactory } from '@/shared/ui/Button/ButtonFactory';
import styles from './WorkItemCardActionEmpty.module.scss';
import { useState } from 'react';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import type { WorkItemCardActionEmptyProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/types/typesWorkItemCardActionEmpty';

export function WorkItemCardActionEmpty<T, P> (
    {
        items,                                    
        brigadeIdWhereEmptyCard,   
        getItemId,
        getItemLabel,

        people,
        getPersonBrigadeId,
        getPersonName,
        getPersonSurname
    }: WorkItemCardActionEmptyProps<T, P>
){

    const [isOpenModal, onIsOPenModal] = useState<boolean>(false);

    return (

        <li
            className={styles['peopleItem-notPerson']}
            
        >

            <span
                className={styles['peopleItem-notPerson-text']}
            >
                Нету Человека
            </span>

            
            <ButtonFactory.addButtonBase
                isOpenModal={isOpenModal}
                onIsOpenModal={onIsOPenModal}
            />

            {isOpenModal && 
                LayoutFactory.layoutCenterBase({
                    openModalSeveral: isOpenModal,
                    onOpenModalSeveral: onIsOPenModal,
                    children: (
                        <ModalFactory.modalReplaceEmptySelect
                            items={items}                     
                            brigadeIdWhereEmptyCard={brigadeIdWhereEmptyCard} 
                            getItemId={getItemId}
                            getItemLabel={getItemLabel}

                            people={people}
                            getPersonBrigadeId={getPersonBrigadeId}
                            getPersonName={getPersonName}
                            getPersonSurname={getPersonSurname}
                        />
                    )
                })
            }


        </li>
        
    )
}