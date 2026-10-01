import type { Shift } from '../../../../entities/shifts/types/shifts.dto';
import styles from './ButtonBlock.module.scss';

interface Props {
    shift: Shift;
    onUserSelectButtons: React.Dispatch<React.SetStateAction<Shift[]>> | null;
}

export function ButtonBlock (
    {
        shift,
        onUserSelectButtons
    }: Props
) {

    return (

        <div
            className={styles['ButtonBlock']}
        >

            <button
                className={styles['ButtonBlock__button']}
                onClick={() => {
                    if(!onUserSelectButtons){
                        return
                    }
                    return onUserSelectButtons((prev) => [...prev, shift])
                }}
                style={{background: shift.color}}
            >

                {(shift.start_time && shift.end_time) 

                    ? (
                        <>
                            <span>
                                с {shift.start_time?.slice(0, 5)}
                            </span>

                            <span>
                                до {shift.end_time?.slice(0, 5)} 
                            </span>
                        </>
                    )

                    : (
                        <span
                            className={styles['ButtonBlock__notTime']}
                        >
                            {shift.label.slice(0,1)}
                        </span>
                    )

                }

            </button>

            <div
                className={styles['ButtonBlock__label']}
            >

                {shift.label}

            </div>

        </div>

    )

}