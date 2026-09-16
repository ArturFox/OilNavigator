import { useSelector } from 'react-redux';
import { useGetPersonReplacementQuery } from '../../entities/personReplacement/api/getPersonReplacement';
import { useGetShiftsQuery } from '../../entities/shifts/api/getShifts';
import { BrigadeChange, useGetBrigadesQuery, useGetPesonsQuery } from './barrel';
import styles from './ScheduleChangePage.module.scss';
import { brigadeSortArrScheduleChange, peopleMapScheduleChange } from './model/selectorsScheduleChange';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../entities/persons/types/persons.dto';

export function ScheduleChangePage() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const personReplacementQuery = useGetPersonReplacementQuery();
    const shiftQuery = useGetShiftsQuery();

    const brigadeSortArr = useSelector(brigadeSortArrScheduleChange) as Brigade[];
    const peopleMap = useSelector(peopleMapScheduleChange) as Map<string, Persons[]>;

    if(
        personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        personReplacementQuery.isLoading ||
        shiftQuery.isLoading
    ) {
        <div>
            ...Загурзка
        </div>
    }

    return (

        <main className={styles['scheduleChange']}> 

            {/* <section className={styles['scheduleChange__block']}>
            
                <h4 className={styles['scheduleChange__title']}>
                    {`Составте график для бригад(ы)`}
                </h4>
            
                <button 
                    className={styles['scheduleChange__button']}
                    onClick={() => setArrShift((prev) => prev.slice(0, -1))}
                    type="button"
                >
                    Удалить
                </button>

            </section> */}

            {/* <ShiftConstructor
                arrButtons={arrButtons}
                arrShift={arrShift}
                setArrShift={setArrShift}
            /> */}

            {/* <h4 
                className={styles['scheduleChange__titlee']}
            >

                <span className={styles['scheduleChange__titlee__span']}>
                    Оставте или Измените
                </span>

                <span className={styles['scheduleChange__titlee__span']}>
                    время начала выбранных смен
                </span>

            </h4>

            <ShiftTimeEditor
                openWindow={openWindow}
                arrButtons={arrButtons}
                setArrButtons={setArrButtons}
            /> */}

            <h4
                className={styles['scheduleChange__h4']}
            >
                Состав бригад
            </h4>

            <BrigadeChange
                brigadeSortArr={brigadeSortArr}
                peopleMap={peopleMap}
            />

            {/* <PersonsEditor 
                brigades={arrBrigadesProps} 
                currentButton={currentButton} 
                selectedCrew={selectedCrew} 
                onSelectBrigade={click}
                deletF={deletF}
                clickChangePerson={clickChangePerson}
            /> */}

            {/* { newUser && (
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
            } */}

            {/* {flagOpenWindow && (
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
            )} */}

        </main>

    );

}