import type { WorkInfoBaseProps } from "@/shared/ui/PersonStatus/PersonStatusFactory/types/typesPersonStatus";
import styles from './WorkInfoBase.module.scss';

export function WorkInfoBase(
    {
        job_title,
        block,
        discharge
    }: WorkInfoBaseProps
){
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
                {

                    <span
                        
                    >

                        {discharge}

                    </span>   

                }

            </div>

        </div>

    )
}