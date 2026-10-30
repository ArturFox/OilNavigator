import type { DetailedPersonModalProps } from '@/shared/ui/Modal/ModalCenter/DetailPersonModal/types/typesDetailPersonModal';
import { Title } from '@/shared/ui/Modal/ModalCenter/widgets/Title/Title';
import { Brigade } from '@/shared/ui/Modal/ModalCenter/widgets/Brigade/Brigade';
import { JobTitle } from '@/shared/ui/Modal/ModalCenter/widgets/JobTitle/JobTitle';
import { Block } from '@/shared/ui/Modal/ModalCenter/widgets/Block/Block';
import { Discharge } from '@/shared/ui/Modal/ModalCenter/widgets/Discharge/Discharge';
import { Birthday } from '@/shared/ui/Modal/ModalCenter/widgets/Birthday/Birthday';

export function DetailPersonModal({
    name,
    surname,
    otherSurname,
    job_title,
    block,
    discharge,
}: DetailedPersonModalProps
) {

    return (
        
        <>
                
            <Title
                name={name}
                surname={surname}
                otherSurname={otherSurname}
            />

            <Brigade/>

            <JobTitle
                jobTitle={job_title}
            />

            <Block
                block={block}
            />

            {/* <div className={styles['modal__blockInfo']}>
                <h5 className={styles['modal__nameCategory']}>
                    Проблемы:
                </h5>

                <div className={styles['modal__blockProblem']}>
                    {arrProblem && arrProblem.length > 0 ? (
                        arrProblem.map((problem, index) => (
                            <span
                                key={index}
                                className={styles['modal__problem']}
                            >
                                {problem}
                            </span>
                        ))
                    ) : (
                        <span className={styles['modal__good']}>
                            нету
                        </span>
                    )}
                </div>
            </div> */}

            <Discharge
                discharge={discharge}
            />

            <Birthday/>

            {/* <div className={styles['modal__blockInfo']}>
                <h5 className={styles['modal__nameCategory']}>
                    Знание доп. блоков:
                </h5>

                <span className={styles['modal__nameHeCan']}>
                    {avalibleBlocks.map((block, index) => {
                        let blockSame: boolean;

                        if (
                            personToReplace &&
                            personToReplace.he_can &&
                            personToReplace.he_can.length > 0
                        ) {
                            blockSame = personToReplace.he_can.includes(block);
                        } else {
                            blockSame = false;
                        }

                        return (
                            <span
                                key={`${index}+${block}`}
                                className={`
                                    ${styles['modal__heCanName']}
                                    ${blockSame && styles['modal__heCanName--same']}
                                `}
                            >
                                {block}
                            </span>
                        );
                    })}
                </span>
            </div> */}
            
        </>
    );
}