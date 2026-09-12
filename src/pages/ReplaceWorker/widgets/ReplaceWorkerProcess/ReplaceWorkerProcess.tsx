import type { PersonsWithStatus } from '../../../../entities/persons/types/persons.dto';
import { ModalCenterWindow } from '../../../../shared/ui/Modal/ModalCenterWindow/ModalCenterWindow';
import type { SelectedPerson } from '../../types/typeReplaseWorker';
import { LeftCard } from './components/LeftCard';
import { RightCard } from './components/RightCard';
import styles from './ReplaceWorkerProcess.module.scss';
import { useState } from 'react';

interface Props {
    selectedPerson: SelectedPerson;
    personToReplace: PersonsWithStatus | null;
    arrProblemPersonToReplace: string[];
    ap: (selectedHuman: PersonsWithStatus) => Promise<void>;
}

export function ReplaceWorkerProcess (
    {
        selectedPerson, 
        personToReplace,   
        arrProblemPersonToReplace,
        ap
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
                ap={ap}
            />

            {personToReplace && (
                <ModalCenterWindow
                    modalCenter={modalCenter}
                    onModalCenter={onModalCenter}
                    person={personToReplace}
                />
            )}

        </section>
    )
}