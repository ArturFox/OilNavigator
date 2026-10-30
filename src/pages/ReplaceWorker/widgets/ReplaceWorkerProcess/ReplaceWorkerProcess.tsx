import { ModalFactory } from '@/shared/ui/Modal/ModalFactory';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import type { SelectedPerson } from '../../types/typeReplaseWorker';
import { LeftCard } from './components/LeftCard';
import { RightCard } from './components/RightCard';
import styles from './ReplaceWorkerProcess.module.scss';
import { useState } from 'react';

interface Props {
    selectedPerson: SelectedPerson;
    personToReplace: Persons | null;
    arrProblemPersonToReplace: string[];
    ap: (selectedHuman: Persons) => Promise<void>;
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
                <ModalFactory.modalCenterBasic
                    modalCenter={modalCenter}
                    onModalCenter={onModalCenter}
                    name={personToReplace.name}
                    surname={personToReplace.surname}
                    otherSurname={personToReplace.other_surname}
                    job_title={personToReplace.job_title}
                    block={personToReplace.block}
                    discharge={personToReplace.discharge}
                    avalibleBlocks={(personToReplace.he_can ?? [])}
                />
            )}

        </section>
    )
}