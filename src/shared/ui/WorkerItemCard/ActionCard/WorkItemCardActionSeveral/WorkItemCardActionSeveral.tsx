
import styles from './WorkItemCardActionSeveral.module.scss';
import { useState } from 'react';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import type { WorkItemCardActionSeveralProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/types/typesWorkItemCardActionSeveral';
import { Identity } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/Identity/Identity';
import { AvailableBlocks } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/AvailableBlocks/AvailableBlocks';
import { WorkInfo } from '@/shared/ui/WorkerItemCard/ActionCard/widgets/WorkInfo/WorkInfo';

export function WorkItemCardActionSeveral(
    {
        setIsApplymodalReplaceSeveral,
        setIsApplymodalReplaceOnlyOne,

        persons,
        brigadesIdAndNumbers,
        listSelectedUsers,
        onListSelectedUsers,

        isButtonSelectCheck,
        isOpenModalSeveral,
        setIsOpenModalSeveral,
        arrSelectButton,
        isActiveSlide
    }: WorkItemCardActionSeveralProps
) {

    const [isOpenModal, onIsOpenModal] = useState<string | null>(null);

    const [isOpenModalDetail, onIsOpenModalDetail] = useState<string | null>(null);

    return (

        <>
            {persons.map((person) => {

                const isOpenModall = listSelectedUsers.includes(person.id);

                return (

                    <li
                        key={person.id}
                        className={styles["replaceWorkerItem"]}
                    >
                        
                        <Identity
                            surname={person.surname}
                            name={person.name}
                            otherSurname={person.otherSurname}
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
                                job_title={person.job_title}
                                block={person.block}
                                discharge={person.discharge}
                                marginRightPx={5}
                                gapPx={5}
                                widthPercent={65}
                            />

                            <AvailableBlocks
                                fontSizeTitle={15}
                                fontSizeBlocks={15}
                                he_can={person.avalibleBlocks}
                                widthPercent={35}
                            />
                        </div>

                        {!isButtonSelectCheck &&

                            <div 
                                className={styles["replaceWorkerItem__selectionButton"]}
                            >

                                <button
                                    className={`
                                        ${styles['replaceWorkerItem__selectionButton-button']}
                                        ${isOpenModal === person.id && styles["replaceWorkerItem__selectionButton-button--selected"]}
                                    `}
                                    onClick={() => onIsOpenModal(isOpenModal === person.id ? null : person.id)}
                                >

                                    {isOpenModal === person.id ? 'Выбран' : 'Выбрать'}

                                </button>

                            </div>

                        }

                        {isButtonSelectCheck &&

                            <div 
                                className={styles["replaceWorkerItem__selectionButton"]}
                            >

                                <button
                                    className={`
                                        ${styles['replaceWorkerItem__selectionButton-button']}
                                        ${isOpenModall && styles["replaceWorkerItem__selectionButton-button--selected"]}
                                    `}
                                    onClick={() => onListSelectedUsers((prev) => {

                                        if (isOpenModall) {
                                            return prev.filter((personId) => personId !== person.id);
                                        }

                                        return [...prev, person.id];
                                    })}
                                >
                                    {isOpenModall ? 'Выбран' : 'Выбрать'}

                                </button>

                            </div>

                        }

                        {(!isButtonSelectCheck && isOpenModal === person.id) &&

                            LayoutFactory.layoutCenterColumn({

                                isOpenModal: isOpenModal === person.id,
                                onIsOpenModal: (value) => onIsOpenModal(value ? person.id : null),
                                children: (

                                    <ModalFactory.modalReplaceOnlyOne
                                        id={person.id}
                                        name={person.name}
                                        surname={person.surname}
                                        brigadesIdAndNumbers={brigadesIdAndNumbers}
                                        setApply={setIsApplymodalReplaceOnlyOne}
                                    />

                                )

                            })

                        }

                        <div 
                            className={styles["replaceWorkerItem__detailsButton"]}
                        >

                            <button
                                className={styles["replaceWorkerItem__detailsButton-button"]}
                                onClick={() => onIsOpenModalDetail(
                                    isOpenModalDetail === person.id ? null : person.id
                                )}
                            >

                                Подробнее

                            </button>

                        </div>

                        {isOpenModalDetail === person.id &&

                            LayoutFactory.layoutCenterColumn({

                                isOpenModal: true,
                                onIsOpenModal: (value) => onIsOpenModalDetail(value ? person.id : null),
                                children: (

                                    ModalFactory.modalCenterDetailed({
                                        name: person.name,
                                        surname: person.surname,
                                        otherSurname: person.otherSurname,
                                        job_title: person.job_title,
                                        block: person.block,
                                        discharge: person.discharge,
                                        avalibleBlocks: person.avalibleBlocks
                                    })

                                )

                            })

                        }

                    </li>

                );

            })}

            {isActiveSlide && isButtonSelectCheck && isOpenModalSeveral &&

                LayoutFactory.layoutCenterColumn({

                    isOpenModal: isOpenModalSeveral,
                    onIsOpenModal: setIsOpenModalSeveral,
                    children: (

                        <ModalFactory.modalReplaceSeveralSelect
                            brigadesIdAndNumbers={brigadesIdAndNumbers}
                            arrSelectButton={arrSelectButton}
                            setAplly={setIsApplymodalReplaceSeveral}
                        />

                    )

                })

            }

        </>

    );

}