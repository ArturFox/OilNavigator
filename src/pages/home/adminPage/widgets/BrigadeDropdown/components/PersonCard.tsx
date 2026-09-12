import { BadgeCheck, OctagonAlert } from 'lucide-react';
import styles from './PersonCard.module.scss';
import type { SortShift } from '../../../../../../entities/shifts/types/shifts.dto';

interface Props {
    hasRedAlarm: boolean;
    hasYellowAlarm: boolean;
    shift: SortShift;
}

export function PersonCard ({
    hasRedAlarm, 
    hasYellowAlarm,  
    shift, 
}: Props) {

    return (

        <div
            className={styles["personCard"]}
        >

            <div className={styles["personCard__header"]}>

                <div className={styles["personCard__mainInfo"]}>

                    <div 
                        className={`
                            ${styles["personCard__icon"]}
                            ${!shift.isFutureDate && styles["personCard__icon--gray"]}    
                        `}
                        aria-hidden="true"
                    >
                        {shift.isFutureDate 
                            ? hasRedAlarm && hasYellowAlarm
                                ?   <OctagonAlert 
                                        className={styles["personCard__statusIcon--mixed"]}
                                        aria-hidden="true"
                                    /> 
                                :   hasRedAlarm
                                        ?   <OctagonAlert 
                                                className={styles["personCard__statusIcon--red"]}
                                                aria-hidden="true"
                                            /> 
                                        :   hasYellowAlarm
                                                ?   <OctagonAlert 
                                                        className={styles["personCard__statusIcon--yellow"]}
                                                        aria-hidden="true"
                                                    /> 
                                                :   <BadgeCheck 
                                                        className={styles["personCard__statusIcon--green"]}
                                                        aria-hidden="true"
                                                    />
                            :    <OctagonAlert 
                                    className={styles["personCard__statusIcon--gray"]}
                                    aria-hidden="true"
                                /> 
                        }
                    </div>

                    <div 
                        className={styles["personCard__statusTextBlock"]}
                    >

                        <span 
                            className={`
                                ${styles["personCard__brigadeName"]}
                                ${!shift.isFutureDate && styles["personCard__brigadeName--gray"]}    
                            `}
                        >

                            {shift.brigade?.name ?? 'Такой бригады нету'}

                        </span>
                        
                        
                        {shift.isFutureDate 
                            ? hasRedAlarm && hasYellowAlarm

                                ? (
                                    
                                    <span 
                                        className={styles["personCard__textStatus--mixed"]}
                                    >
                                        Что-то не так
                                    </span>)

                                : hasRedAlarm
                                    
                                    ? (
                                        <span 
                                            className={styles["personCard__textStatus--red"]}
                                        >
                                            Что-то не так
                                        </span>
                                    ) 
                                    
                                    : hasYellowAlarm
                                        
                                        ? (
                                            <span 
                                                className={styles["personCard__textStatus--yellow"]}
                                            >
                                                Что-то не так
                                            </span>
                                        )

                                        : (
                                            <span 
                                                className={styles["personCard__textStatus--green"]}
                                            >
                                                Проблем нет
                                            </span>
                                        ) 
                            :   (
                                    <span 
                                        className={styles["personCard__textStatus--gray"]}
                                    >
                                        Этот день прошёл
                                    </span>
                                ) 
                        }

                    </div>

                </div>

            </div>

            <div className={`
                ${styles["personCard__russianDate"]}
                ${!shift.isFutureDate && styles["personCard__russianDate--gray"]}
            `}>

                <span>
                    {shift.russianDate}
                </span>

                <span>
                    {shift.startTime} - {shift.endTime}
                </span>

            </div>

        </div>
    )
}