import { useState } from "react";
import styles from './ScheduleChangePage.module.scss';
import { useSelector } from "react-redux";
import { useGetBrigadesQuery } from "../../entities/brigades/api/getBrigades";
import { brigadesMap, selectFirstInstallationId } from "../../entities/brigades/model/selectors/brigades";
import type { BrigadesDto } from "../../entities/brigades/types/brigades.dto";
import { useGetPesonsQuery } from "../../entities/persons/api/getPersons";
import { personsMap } from "../../entities/persons/model/selectors/persons";
import type { PersonsDto } from "../../entities/persons/types/persons.dto";
import { ShiftConstructor } from "../../widgets/ShiftConstructor/ui/ShiftConstructor";
import { PersonsEditor } from "../../widgets/PersonsEditor/ui/PersonsEditor";
import { BrigadeSelector } from "../../widgets/BrigadeSelector/ui/BrigadeSelector";
import { ShiftTimeEditor } from "../../widgets/ShiftTimeEditor/ui/ShiftTimeEditor";
import { EVENING, MORNING, NIGHT, type DataType, type DayOffType } from "../../shared/constants/shifts";
import { useShiftTimeEditor } from "../../widgets/ShiftTimeEditor/model/useShiftTimeEditor";
import { useBrigadeSelector } from "../../widgets/BrigadeSelector/model/useBrigadeSelector";
import { useBrigadeActions } from "../../features/brigadeManagement/model/useBrigadeActions";
import { usePersonsEditor } from "../../widgets/PersonsEditor/model/usePersonsEditor";
import { useShiftActions } from "../../features/shiftManagement/useShiftActions";
import { usePersonManagment } from "../../features/personManagment/usePersonManagment";
import { OverlayParent } from "../../widgets/OverlayShell/ui/OverlayParent";
import { OverlayChildren } from "../../widgets/OverlayShell/ui/OverlayChildren";
import { useOverlay } from "../../widgets/CreateBrigadeModal/model/useCreateBrigadeModal";
import { ShiftTimeModal } from "../../widgets/ShiftTimeModal/ui/ShiftTimeModal";
import { CreateBrigadeModal } from "../../widgets/CreateBrigadeModal/ui/CreateBrigadeModal";

export function ScheduleChangePage() {

    // Хуки
    const brigadesQuery = useGetBrigadesQuery();
    const peopleQuery = useGetPesonsQuery();

    // Данные из селекторов 
    const brigades: Map<string, BrigadesDto> = useSelector(brigadesMap);
    const persons: Map<string, PersonsDto[]> = useSelector(personsMap);
    const installation = useSelector(selectFirstInstallationId);

    // Преоброзовали полученные данные от Селектора Бригад из Map в Arr
    const arrBrigadesProps: BrigadesDto[] = Array.from(brigades.values());

    // Состояния
    const [arrButtons, setArrButtons] = useState<DataType[]>([MORNING, EVENING, NIGHT]);
    type DataTypeAll = DataType | DayOffType
    const [arrShift, setArrShift] = useState<DataTypeAll[]>([MORNING, EVENING]);

    if(brigadesQuery.isLoading || peopleQuery.isLoading || !installation){
        
        return (
            <div>
                Загрузка
            </div>
        )
    
    }

    // Мои хуки
    const {flagOpenWindow, localState, openWindow, setFlagOpenWindow} = useShiftTimeEditor();
    const {brigadeClick, addDateBrigade, fnDiv, addDate, newUser, setNewUser, dateInput, setDateInput} = useBrigadeSelector();
    const { deleteBrigade, createBrigade } = useBrigadeActions();
    const { selectedCrew, currentButton, click, clickChangePerson, changePerson, personObj } = usePersonsEditor(persons);
    const { brigadeNumber, setBrigadeNumber, newUserSend } = useOverlay({ installation });
    const { createShiftPattern } = useShiftActions();
    const {deletF, chanhe} = usePersonManagment()

    async function handleSave() {
        const requests = brigadeClick.flatMap((brigadeId) =>
            arrShift.map((shift, index) =>
                createShiftPattern({
                    brigade_id: brigadeId,
                    day_index: index,
                    code: shift.code,
                    label: shift.label,
                    start_time: shift.start_time ?? null,
                    end_time: shift.end_time ?? null,
                })
            )
        );

        await Promise.all(requests);
    }

    return (

        <main className={styles['main']}> 

            <section className={styles['main__block']}>
            
                <h4 className={styles['main__block__title']}>
                    {`Составте график для бригад(ы)`}
                </h4>
            
                <button 
                    className={styles['main__block__button']}
                    onClick={() => setArrShift((prev) => prev.slice(0, -1))}
                    type="button"
                >
                    Удалить
                </button>

            </section>

            <ShiftConstructor
                arrButtons={arrButtons}
                arrShift={arrShift}
                setArrShift={setArrShift}
            />

            <h4 
                className={styles['main__titlee']}
            >

                <span className={styles['main__titlee__span']}>
                    Оставте или Измените
                </span>

                <span className={styles['main__titlee__span']}>
                    время начала выбранных смен
                </span>

            </h4>

            <ShiftTimeEditor
                openWindow={openWindow}
                arrButtons={arrButtons}
                setArrButtons={setArrButtons}
            />

            <h4
                className={styles['main__h4']}
            >
                Нажмите на бригады у которых хотите изменить расписание
            </h4>

            <BrigadeSelector
                brigades={arrBrigadesProps}
                dateInput={dateInput}
                brigadeClick={brigadeClick}
                addDateBrigade={addDateBrigade}
                setDateInput={setDateInput}
                fnDiv={fnDiv}
                addDate={addDate}
                deleteBrigade={deleteBrigade}
                setNewUser={setNewUser}
            />

            <h4 className={styles['main__title']}>
            
                <span 
                    className={styles['main__title__span']}
                >
                    Оставте или Измените
                </span>

                <span 
                    className={styles['main__title__span']}
                >
                    персонал в бригадах
                </span>

            </h4>

            <PersonsEditor 
                brigades={arrBrigadesProps} 
                currentButton={currentButton} 
                selectedCrew={selectedCrew} 
                onSelectBrigade={click}
                deletF={deletF}
                clickChangePerson={clickChangePerson}
            />

            <button
                className={styles['main__save']}
                onClick={() => handleSave()}
            >
                Сохранить
            </button>

            { newUser && (
                <OverlayParent
                    onClose={() => setNewUser(false)}
                    paddingLeft="20px"
                    paddingRight="20px"
                >
                    <OverlayChildren>

                        <CreateBrigadeModal
                            setNewUser={setNewUser}
                            brigadeNumber={brigadeNumber}
                            setBrigadeNumber={setBrigadeNumber}
                            newUserSend={newUserSend}
                            createBrigade={createBrigade}
                        />

                    </OverlayChildren>

                </OverlayParent>
            )
            }

            {flagOpenWindow && (
                <OverlayParent
                    onClose={() => setFlagOpenWindow(false)}
                    alignItems="flex-end"
                >
                    <OverlayChildren
                        display="block"
                        color="white"
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                    >

                        <ShiftTimeModal
                            localState={localState}
                        />

                    </OverlayChildren>

                </OverlayParent>
            )}

            {changePerson && personObj && (
                <div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {arrBrigadesProps.map((b) => (
                            <button
                                key={b.id}
                                onClick={() =>
                                    chanhe({
                                        idPerson: personObj.id,
                                        idClickNewBrigade: b.id,
                                    })
                                }
                            >
                                {b.name}
                            </button>
                        ))}
                    </div>

                    <div>
                        {personObj.name}
                    </div>

                </div>
            )}

        </main>
    );
}