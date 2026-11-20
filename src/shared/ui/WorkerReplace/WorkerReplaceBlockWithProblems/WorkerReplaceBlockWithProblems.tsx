import styles from './WorkerReplaceBlockWithProblems.module.scss';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { useState } from 'react';
import type { WorkerReplaceBlockWithProblemsProps } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/types/typesWorkerReplaceBlockWithProblems';
import { CurrentWorkerCardWithProblems } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/widgets/CurrentWorkerCardWithProblems/CurrentWorkerCardWithProblems';
import { NewWorkerCardWithProblems } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/widgets/NewWorkerCardWithProblems/NewWorkerCardWithProblems';

export function WorkerReplaceBlockWithProblems (
    {
        currentWorker, 
        newWorker,   
    }:WorkerReplaceBlockWithProblemsProps
) {

    const [isOpenModalDetail, onIsOpenModalDetail] = useState<boolean>(false);

    return(

        <section
            className={`
                ${styles["replaceWorkerProcess"]}
            `}
        >
            
            <CurrentWorkerCardWithProblems
                id={currentWorker?.id ?? null}
                name={currentWorker?.name ?? null}
                surname={currentWorker?.surname ?? null}
                otherSurname={currentWorker?.otherSurname ?? null}
                numberBrigade={currentWorker?.numberBrigade ?? null}
                jobTitle={currentWorker?.jobTitle ?? null}
                block={currentWorker?.block ?? null}
                discharge={currentWorker?.discharge ?? null}
                avalibleBlocks={currentWorker?.avalibleBlocks ?? null}
                onIsOpenModalDetail={onIsOpenModalDetail}
                redAlarm={currentWorker?.redAlarm ?? []}
                yellowAlarm={currentWorker?.yellowAlarm ?? []}

                objectSelectUser={newWorker?.objectSelectUser ?? null}
            />
             
            <NewWorkerCardWithProblems
                id={newWorker?.id ?? null}
                name={newWorker?.name ?? null}
                surname={newWorker?.surname ?? null}
                otherSurname={newWorker?.otherSurname ?? null}
                numberBrigade={newWorker?.numberBrigade ?? null}
                jobTitle={newWorker?.jobTitle ?? null}
                block={newWorker?.block ?? null}
                discharge={newWorker?.discharge ?? null}
                avalibleBlocks={newWorker?.avalibleBlocks ?? null}
                objectSelectUser={newWorker?.objectSelectUser ?? null}
                setApply={newWorker?.setApply ?? (() => {})}
                redAlarm={newWorker?.redAlarm ?? []}
                yellowAlarm={newWorker?.yellowAlarm ?? []}
            />
            
            {(isOpenModalDetail && currentWorker ) && 
                LayoutFactory.layoutCenterColumn({
                    isOpenModal: isOpenModalDetail,
                    onIsOpenModal: onIsOpenModalDetail,
                    children: (
                        ModalFactory.modalCenterDetailed({
                            name: currentWorker.name,
                            surname: currentWorker.surname,
                            otherSurname: currentWorker.otherSurname,
                            job_title: currentWorker.jobTitle,
                            block: currentWorker.block,
                            discharge: currentWorker.discharge,
                            avalibleBlocks: currentWorker.avalibleBlocks
                        })
                    )
                })
            }

        </section>
    )
}