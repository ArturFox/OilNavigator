import styles from './WorkerReplaceBlockWithProblemAndHavePerson.module.scss';
import { NewWorkerCard } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblem/widgets/NewWorkerCard/NewWorkerCard';
import { CurrentWorkerCard } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblem/widgets/CurrentWorkerCard/CurrentWorkerCard';
import { LayoutFactory } from '@/shared/ui/Layout/LayoutFactory';
import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import { useState } from 'react';
import type { WorkerReplaceBlockWithProblemAndHavePersonProps } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblem/WorkerReplaceBlockWithProblemAndHavePerson/types/typesWorkerReplaceBlockWithProblemAndHavePerson';

export function WorkerReplaceBlockWithProblemAndHavePerson (
    {
        currentWorker, 
        newWorker,   
    }:WorkerReplaceBlockWithProblemAndHavePersonProps
) {

    const [isOpenModalDetail, onIsOpenModalDetail] = useState<boolean>(false);

    return(

        <section
            className={`
                ${styles["replaceWorkerProcess"]}
                 
            `}
        >
            
            <CurrentWorkerCard
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
                objectSelectUser={newWorker?.objectSelectUser ?? null}
            />

             
            <NewWorkerCard
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