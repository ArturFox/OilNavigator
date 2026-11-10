import styles from './WorkItemCardActionOne.module.scss';
import { ButtonFactory } from "@/shared/ui/Button/ButtonFactory";
import { useState } from 'react';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { Identity } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/Identity/Identity';
import { AvailableBlocks } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/AvailableBlocks/AvailableBlocks';
import { WorkInfo } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/WorkInfo/WorkInfo';
import type { WorkItemCardActionOneProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionOne/types/typesWorkItemCardActionOne';

export function WorkItemCardActionOne (
    {
        id,
        name,
        surname,
        otherSurname,
        job_title,
        block,
        discharge,
        avalibleBlocks,

        objectSelectUser,
        onObjectSelectUser

    }: WorkItemCardActionOneProps
){

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
                fontSizeNamePx={18}
                paddingLeftPx={10}
                paddingTopPx={5}
                heightPx={40}
                widthPercent={77}
            />
            
            <div
                className={styles["replaceWorkerItem__status"]}
            >

                <WorkInfo
                    fontSizeJobAndBlockPx={15}
                    fontSizeDischargePx={15}
                    job_title={job_title}
                    block = {block}
                    discharge = {discharge}
                    marginRightPx = {5}
                    gapPx={5}
                    widthPercent={65}
                />

                <AvailableBlocks
                    fontSizeTitle={15}
                    fontSizeBlocks={15}
                    he_can={avalibleBlocks}
                    widthPercent={35}
                />

            </div>

            <ButtonFactory.selectButtonPersonObject
                id={id}
                objectSelectUser={objectSelectUser}
                onObjectSelectUser={onObjectSelectUser}
            />
            
            <ButtonFactory.detailButtonBase
                onModalCenter={onIsOpenModalDetail}
                modalCenter={isOpenModalDetail}
            />

            {isOpenModalDetail && 
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isOpenModalDetail,
                    onIsOpenModal: onIsOpenModalDetail,
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