import styles from './WorkItemCardActionSeveral.module.scss';
import { AvalibleBlocksFactory } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/AvalibleBlocksFactory";
import { PersonStatusFactory } from "@/shared/ui/PersonStatus/PersonStatusFactory/PersonStatusFactory";
import { ButtonFactory } from "@/shared/ui/Button/ButtonFactory";
import { useState } from 'react';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import type { WorkItemCardActionSeveralProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/types/typesWorkItemCardActionSeveral';
import { Identity } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/Identity/Identity';

export function WorkItemCardActionSeveral (
    {
        id,
        name,
        surname,
        otherSurname,
        job_title,
        block,
        discharge,
        avalibleBlocks,

        buttonSelectCheck,

        brigadesId,
        brigadesNumber, 

        listSelectedUsers,
        onListSelectedUsers,

        onApply

    }: WorkItemCardActionSeveralProps
){
    
    const isOpenModal: boolean = listSelectedUsers.some(
        (person) => person.id === id
    );

    const [isOpenModalDetail, onIsOpenModalDetail] = useState<boolean>(false);

    return (

        <li
            className={`
                ${styles["replaceWorkerItem"]}    
            `}
        >

            <Identity
                surname={surname}
                name={name}
                otherSurname={otherSurname}
            />
            
            <div
                className={styles["replaceWorkerItem__status"]}
            >

                {PersonStatusFactory.workInfoBase({
                    job_title: job_title,
                    block: block,
                    discharge: discharge,
                })}

                {AvalibleBlocksFactory.avalibleBlocksBase({
                    he_can: avalibleBlocks
                })}

            </div>

            <ButtonFactory.selectButtonBase
                id = {id}
                name = {name}
                surname = {surname}
                isOpenModal = {isOpenModal}
                onListSelectedUsers = {onListSelectedUsers}
            />
            
            {!buttonSelectCheck && 
                LayoutFactory.layoutCenterOnePerson({
                    id: id,
                    isOpenModal: isOpenModal,
                    onListSelectedUsers: onListSelectedUsers,
                    children: (
                        <ModalFactory.modalReplaceOnlyOne
                            id={id}
                            name={name}
                            surname={surname}
                            brigadesId={brigadesId}
                            brigadesNumber={brigadesNumber}
                            onApply = {onApply}
                        />
                    ),
                })
            }
            
            <ButtonFactory.detailButtonBase
                onModalCenter={onIsOpenModalDetail}
                modalCenter={isOpenModalDetail}
            />

            {isOpenModalDetail && 
                LayoutFactory.layoutCenterBase({
                    openModalSeveral: isOpenModalDetail,
                    onOpenModalSeveral: onIsOpenModalDetail,
                    children: (
                        ModalFactory.modalCenterDetailed({
                            name: name,
                            surname: surname,
                            otherSurname: otherSurname,
                            job_title: job_title,
                            block: block,
                            discharge: discharge,
                            avalibleBlocks: avalibleBlocks
                        })
                    )
                })
            }

        </li>

    )

}