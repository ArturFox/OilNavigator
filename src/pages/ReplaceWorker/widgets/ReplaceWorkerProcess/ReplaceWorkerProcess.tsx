import type { PersonsWithStatus } from '../../../../entities/persons/types/persons.dto';
import { ModalCenterWindow } from '../../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import { LeftCard } from './components/LeftCard';
import { RightCard } from './components/RightCard';
import styles from './ReplaceWorkerProcess.module.scss';
import { useState } from 'react';

interface Props {
    selectedPerson: PersonsWithStatus | null;
    personToReplace: PersonsWithStatus;
    arrProblemPersonToReplace: string[];
}

export function ReplaceWorkerProcess (
    {
        selectedPerson, 
        personToReplace,   
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