import { useState } from "react";
import { useSelector } from "react-redux";
import { uniqueObjectArrAdminScheduleChange } from "./model/selectorsAdminScheduleChange";
import { useGetShiftsQuery } from "../../entities/shifts/api/getShifts";
import type { Shift } from "../../entities/shifts/types/shifts.dto";
import { ArrowBigDown } from "lucide-react";
import styles from './AdminScheduleChange.module.scss';
import { ButtonBlock } from "./widgets/ButtonBlock/ButtonBlock";
import { ButtonBlockPlus } from "./widgets/ButtonBlockPlus/ButtonBlockPlus";
import { TitleH4 } from "../../shared/ui/Title/TitleH4/TitleH4";

export function AdminScheduleChange() {

    const shiftsQuery = useGetShiftsQuery();

    const uniqueObjectArr = useSelector(uniqueObjectArrAdminScheduleChange);

    const [arrButtons, _] = useState<Shift[]>(uniqueObjectArr);

    const [userSelectButtons, onUserSelectButtons] = useState<Shift[]>([]);

    const [date, onDate] = useState<string>('');

    if(shiftsQuery.isLoading){
        return (
            <main>
                <span>
                    загрузка
                </span>
            </main>
        )
    }
    
    return(
        <main
            className={styles['adminScheduleChange']}
        >

            <h4
                className={styles['adminScheduleChange__title']}
            >
                Изменить расписание бригад
            </h4>

            <section
                className={styles['adminScheduleChange__actions']}
            >

                <button
                    className={styles['adminScheduleChange__actions-buttonChange']}
                >
                    Изменить
                </button>

                <button
                    className={styles['adminScheduleChange__actions-buttonDelete']}
                    onClick={() => {
                        onUserSelectButtons((prev) => prev.slice(0, -1));
                    }}
                >
                    Удалить
                </button>

            </section>

            {userSelectButtons.length > 0 
                
                ? (
                    <section
                        className={styles['adminScheduleChange__buttons']}
                    >

                        {userSelectButtons.map((shift, index) => (

                            <ButtonBlock
                                key={`${shift.id}+${index}+userSelect`}
                                shift={shift}
                                onUserSelectButtons={null}
                            />

                        ))}

                    </section>
                )
                : <div
                    className={styles['adminScheduleChange__createShift']}
                >
                    <TitleH4>
                        Составте расписание
                    </TitleH4>
                </div>
            }
            
            <div
                className={styles['adminScheduleChange__arrowBigDown']}
            >
                <TitleH4>
                    <ArrowBigDown/>
                </TitleH4>
            </div>

            <section
                className={styles['adminScheduleChange__buttons']}
            >

                {arrButtons.map((shift, index) => (

                    <ButtonBlock
                        key={`${shift.id}+${index}`}
                        shift={shift}
                        onUserSelectButtons={onUserSelectButtons}
                    />

                ))}

                <ButtonBlockPlus/>

            </section>

            <div
                className={styles['adminScheduleChange__createShift']}
            >
                <TitleH4
                    disable={userSelectButtons.length === 0}
                >
                    Укажите дату начала 
                </TitleH4>
            </div>

            <div>
                <input
                    type="date"
                    value={date}
                    onChange={(event) => {
                        onDate(event.target.value);
                    }}
                    disabled={userSelectButtons.length === 0}
                />
            </div>



        </main>
    )
}