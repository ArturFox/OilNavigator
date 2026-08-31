import type { BrigadesDto } from '../../../entities/brigades/types/brigades.dto';
import type { PersonsWithStatus } from '../../../entities/persons/types/persons.dto';
import type { SortShift } from '../../../entities/shifts/types/shifts.dto';
import { ModalCenterWindow } from '../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import { LeftCard } from './LeftCard';
import styles from './ReplaceWorkerProcess.module.scss';
import { useEffect, useState } from 'react';
import { RightCard } from './RightCard';

interface Props {
    selectedPerson: PersonsWithStatus | null;
    personToReplace: PersonsWithStatus;
    arrProblemPersonToReplace: string[];
    brigadeName: BrigadesDto;
    shift: SortShift;
}

export function ReplaceWorkerProcess (
    {
        selectedPerson, 
        personToReplace,  
        brigadeName, 
        shift,
        arrProblemPersonToReplace
    }:Props
) {

    const [modalCenter, onModalCenter] = useState<boolean>(false);

    return(

        <section
            className={`
                ${styles["replaceWorkerProcess"]}
                 
            `}

        >

            <LeftCard
                selectedPerson={selectedPerson}
                personToReplace={personToReplace}
                arrProblemPersonToReplace={arrProblemPersonToReplace}
                modalCenter={modalCenter}
                onModalCenter={onModalCenter}
            />

            <RightCard
                selectedPerson={selectedPerson}
            />

            <ModalCenterWindow
                modalCenter={modalCenter}
                onModalCenter={onModalCenter}
                person={personToReplace}
            />

        </section>
    )
}