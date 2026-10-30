import type { WorkInfoWithProblemProps } from "@/shared/ui/PersonStatus/PersonStatusFactory/types/typesPersonStatus";
import styles from './WorkInfoWithProblem.module.scss';

export function WorkInfoWithProblem (
    {
        job_title,
        block,
        arrProblem,
        problemsMoreThatOne,
        currentIndex
    }: WorkInfoWithProblemProps
) {

    return (

        <div
            className={styles["status"]}
        >

            <span
                className={styles["status__jobTitle"]}
            >
                {job_title} / {block}
            </span>

            <div
                className={styles["status__problem"]}
            >
                {arrProblem.length > 0 

                    ?   <>
                            
                            <span
                                
                            >
                                {arrProblem[currentIndex]} {problemsMoreThatOne && `(${arrProblem.length})`}
                            </span>
                            
                        </>
                    : <>

                        <span>
                            Проблем не обноружены
                        </span>
                        
                    </>

                }
            </div>

        </div>

    )

}