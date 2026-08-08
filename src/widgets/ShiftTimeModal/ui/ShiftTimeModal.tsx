import type { DataType } from '../../../shared/constants/shifts';
import styles from '../ShiftTimeModal.module.scss';

interface Props {
    localState: DataType | undefined
}

export function ShiftTimeModal ({localState}: Props) {
    return(
        
        <>
            <article className={styles['articleOne']}>

                <div className={styles['articleOne__blockStartTime']}>
                    
                    <span>
                        Начало
                    </span>
                    
                    <span>
                        {localState?.start_time}
                    </span>

                </div>

                <div className={styles['articleOne__line']}/>

                <div className={styles['articleOne__blockEndTime']}>
                    
                    <span>
                        Конец
                    </span>

                    <span>
                        {localState?.end_time}
                    </span>

                </div>
            
            </article>

            <article className={styles["articleTwo"]}>

                <div className={styles['articleTwo__changeTime']}> 
                
                    <input
                        type="time"
                    />

                </div> 

                <div 
                    className={styles['articleTwo__line']}                        
                />

                <button className={styles['articleTwo__ok']}>
                    ОК
                </button>
            
            </article>

        </> 
    )
}