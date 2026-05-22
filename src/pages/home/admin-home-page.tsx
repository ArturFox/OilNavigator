import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/new-store";
import { personsMap } from "../../api/persons/persons.selector";
import { shiftMap } from "../../api/shifts/shifts.selectors";
import { brigades } from "../../api/brigades/brigades.selectors";
import styles from '../../styles/blocks/home.module.scss';
import { Link } from "react-router-dom";
import { BrigadeDropdown } from "../../widgets/brigade-dropdown/ui/BrigadeDropdown";
import { CalendarAdmin } from "../../widgets/calendar_admin/ui/CalendarAdmin";
import type { PersonsDto } from "../../api/persons/persons.dto";
import type { BrigadesDto } from "../../api/brigades/brigades.dto";
import type { SortShift } from "../../api/shifts/shifts.dto";


export function AdminHomePage() {

    const [flagArrslakers, setFlagArrslakers] = useState<boolean>(false);

    const stringDate: string = useSelector((state: RootState) => state.date.day);

    const personsMapApp = useSelector(personsMap) as Map<string, PersonsDto[]>;
    const brigadesApp = useSelector(brigades) as Map<string, BrigadesDto>;
    const shiftsMapApp = useSelector(shiftMap) as Map<string, SortShift[]>;

    const shiftsToday: SortShift[] = shiftsMapApp.get(stringDate) ?? [];

    const shiftsWhoWorkToday: SortShift[] = shiftsToday.filter(s => s.code !== "О");
    const shiftsWhoRestToday: SortShift[] = shiftsToday.filter(s => s.code === "О");

    return(
        <>
            <section className={styles["main__topBar"]}>
                <CalendarAdmin
                    personsMapProps={personsMapApp} 
                    shiftsMapProps={shiftsMapApp} 
                />
            </section>

            <section className={styles["main__changeShift"]}>
            
                <button 
                    onClick={() => setFlagArrslakers(!flagArrslakers)}
                    className={styles["main__buttonChangeShift"]}
                >
                    Все бригады
                </button>

                <Link to="/changeShift">
                    <button className={styles["main__buttonChangeShift"]}>
                        Изменить расписание
                    </button>
                </Link>

            </section>

            <section className={styles["main__dropdown"]}>

                {shiftsWhoWorkToday.map((s) => (
                    <BrigadeDropdown
                        key={s.id} 
                        shift={s} 
                        stringDate={stringDate}
                        people={personsMapApp.get(s.brigadeId) ?? []} 
                        brigadeProps={brigadesApp.get(s.brigadeId)}
                    />
                ))}

                {flagArrslakers && (
                    <>

                        <div className={styles["main__block"]}>
                            <div className={styles["main__line"]}></div>
                            <span className={styles["main__rest"]}>Отдыхают</span>
                        </div>

                        {shiftsWhoRestToday.map((s) => (
                            <BrigadeDropdown
                                key={s.id}
                                shift={s}
                                people={personsMapApp.get(s.brigadeId) ?? []}
                                stringDate={stringDate}
                                brigadeProps={brigadesApp.get(s.brigadeId)}
                            />
                        ))}

                    </>
                )}
                
            </section>

        </>
    )
}