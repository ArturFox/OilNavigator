import type { NewWorkerCardWithProblemsProps } from '@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/widgets/NewWorkerCardWithProblems/types/typesNewWorkerCardWithProblems';
import styles from './NewWorkerCardWithProblems.module.scss';

export function NewWorkerCardWithProblems (
    {
        id,
        name,
        surname,
        otherSurname,
        block,
        jobTitle,
        numberBrigade,
        objectSelectUser,
        setApply,
        redAlarm,
        yellowAlarm
    }: NewWorkerCardWithProblemsProps
) {

    return (

        <article
            className={`
                ${styles["rightCard"]}

                ${id === null && styles["rightCard--notHuman"]}

                ${(id !== null && objectSelectUser) && styles["rightCard--selected"]}

                ${id !== null && redAlarm.length === 0 && yellowAlarm.length === 0 && styles["rightCard--success"]}
                ${id !== null && redAlarm.length > 0 && yellowAlarm.length === 0 && styles["rightCard--redAlarm"]}
                ${id !== null && yellowAlarm.length > 0 && redAlarm.length === 0 && styles["rightCard--yellowAlarm"]}
                ${id !== null && redAlarm.length > 0 && yellowAlarm.length > 0 && styles["rightCard--bothAlarm"]}
            `}
        >
            
            {id === null 
                ? 
                    <span
                        className={styles["rightCard__titleAddHuman"]}
                    >
                        Выберите человека
                    </span>
                : 
                <>
                    <h3
                        className={styles["rightCard__blockBrigadeName"]}
                    >

                        <span>

                            Бригада {numberBrigade ?? '(нету)'}

                        </span>

                    </h3>

                    <div
                        className={styles["rightCard__blockPersonInfo"]}
                    >

                        <span
                            className={styles["rightCard__surnameName"]}
                        >

                            {surname} {name}

                        </span>

                        <span
                            className={styles["rightCard__otherSurname"]}
                        >
                            {otherSurname}
                        </span>

                    </div>

        
                    <div
                        className={styles["rightCard__blockJob"]}
                    >

                        <span>
                            Должность / блок:
                        </span>

                        <span
                            className={styles["rightCard__jobText"]}
                        >
                            {jobTitle} / {block}
                        </span>

                    </div>
                

                    <div
                        className={`
                            ${styles["rightCard__blockProblem"]}
                        `}
                    >   

                        <span
                            className={styles["rightCard__titleProblem"]}
                        >
                            
                            Проблемы
                            
                        </span>

                        
                        <span
                            className={styles["rightCard__textProblem"]}
                        >

                            7

                        </span>
                            
                    </div>
                        
                    
                    <button
                        className={`
                            ${styles["rightCard__acceptButton"]}
                            ${objectSelectUser?.id !== null && styles["rightCard__acceptButton--selected"]}
                        `}
                        onClick={() => setApply(true)}
                    >
                        Применить
                    </button>
                </>
            }

        </article>
    )
}