import type { CurrentWorkerCardWithProblemsProps } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/widgets/CurrentWorkerCardWithProblems/types/typesCurrentWorkerCardWithProblems';
import styles from './CurrentWorkerCardWithProblems.module.scss';

export function CurrentWorkerCardWithProblems (
    {
        id,
        name,
        surname,
        otherSurname,
        block,
        jobTitle,
        numberBrigade,
        onIsOpenModalDetail,
        objectSelectUser,
        redAlarm,
        yellowAlarm
    }: CurrentWorkerCardWithProblemsProps
) {
    
    return (
        
        <article
            className={`
                ${styles["leftCard"]}
                ${id === null && styles["leftCard--notHuman"]}
                ${objectSelectUser && styles["leftCard--selected"]}
                ${redAlarm.length > 0 && yellowAlarm.length === 0 && styles["leftCard--redAlarm"]}
                ${yellowAlarm.length > 0 && redAlarm.length === 0 && styles["leftCard--yellowAlarm"]}
                ${redAlarm.length > 0 && yellowAlarm.length > 0 && styles["leftCard--bothAlarm"]}
                ${redAlarm.length === 0 && yellowAlarm.length === 0 && styles["leftCard--success"]}
            `}
        >
            {id === null 
                ? (
                    <span className={styles["leftCard__titleNotHuman"]}>
                        Человек отсутствует
                    </span>
                )

                : (
                    <>

                        <h3 className={styles["leftCard__blockBrigadeName"]}>
                            <span>
                                Бригада {numberBrigade ?? '(нету)'}
                            </span>
                        </h3>

                        <div className={styles["leftCard__blockPersonInfo"]}>
                            <span>
                                {surname} {name}
                            </span>
                            <span>
                                {otherSurname}
                            </span>
                        </div>
    
                        <div className={styles["leftCard__blockJob"]}>
                            <span>
                                Должность / блок:
                            </span>
                            <span className={styles["leftCard__jobText"]}>
                                {jobTitle} / {block}
                            </span>
                        </div>
        
                        <div className={`${styles["leftCard__blockProblem"]}`}> 

                            <span className={styles["leftCard__titleProblem"]}>
                                
                                Проблемы
                                
                            </span>

                            
                                
                            <span className={styles["leftCard__textProblem"]}>
                                7
                            </span>
                                
                        </div>

                        <button
                            className={`${styles["leftCard__acceptButton"]}`}
                            onClick={() => onIsOpenModalDetail(true)}
                        >
                            Подробнее
                        </button>
                    </>
                )
            }
        </article>

    );

}
