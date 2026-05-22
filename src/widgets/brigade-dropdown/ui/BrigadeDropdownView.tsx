import { ArrowDownWideNarrow, BadgeCheck, Cake, OctagonAlert } from 'lucide-react';
import styles from '../../../styles/blocks/dropdown.module.scss';
import type { SortShift } from '../../../api/shifts/shifts.dto';

interface Props {
    hasRedAlarm: boolean;
    hasYellowAlarm: boolean;
    hasBirthday: boolean;
    open: boolean;
    shift: SortShift;
    brigadeName?: string;
}

export function BrigadeDropdownView ({hasRedAlarm, hasYellowAlarm, hasBirthday, open, shift, brigadeName}: Props) {

    return (
        <>
            <div className={styles["article__viewTop"]}>

                <div className={styles["article__viewFirstBlock"]}>

                    <div className={styles["article__viewTopIcone"]}>
                        {hasRedAlarm && hasYellowAlarm
                            ? <OctagonAlert className={styles["article__viewTopIconeColorRedandYellow"]}/> 
                            : hasRedAlarm
                                ? <OctagonAlert className={styles["article__viewTopIconeColorRed"]}/> 
                                : hasYellowAlarm
                                    ? <OctagonAlert className={styles["article__viewTopIconeColorYellow"]}/> 
                                    : <BadgeCheck className={styles["article__viewTopIconeColorGreen"]}/>
                        }
                    </div>

                    <div className={styles["article__viewTopRighteBlock"]}>

                        {hasBirthday 

                        ?   <span className={styles["article__viewTopRighteBlockBirthday"]}>
                                {brigadeName} 
                                <Cake size={20}/>
                            </span>

                        :   <span>
                                {brigadeName}
                            </span>
                        }
                        
                        {hasRedAlarm && hasYellowAlarm
                            ? (<span className={styles["article__viewTopRighteBlockAlarm"]}>
                                    Что-то не так
                                </span>)
                            : hasRedAlarm
                                ? (<span className={styles["article__viewTopRighteBlockAlarmRed"]}>
                                        Что-то не так
                                    </span>) 
                                : hasYellowAlarm
                                    ? (<span className={styles["article__viewTopRighteBlockAlarmYellow"]}>
                                            Что-то не так
                                        </span>) 
                                    : (<span className={styles["article__viewTopRighteBlockGood"]}>
                                            Проблем нет
                                        </span>) 
                        }

                    </div>

                </div>

                <div className={styles["article__viewSecondBlock"]}>
                    <ArrowDownWideNarrow style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}/>
                </div>

            </div>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>{shift.russianDate}</span>
                <span>{shift.startTime} - {shift.endTime}</span>
            </div>
        </>
    )
}