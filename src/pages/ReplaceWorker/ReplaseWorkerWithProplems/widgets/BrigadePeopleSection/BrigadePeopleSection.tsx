import type { Persons } from '@/entities/persons/types/persons.dto';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import styles from './BrigadePeopleSection.module.scss';

type IdSelectedUser = {
    id: string;
};

interface Props {
    personIdParam: string | null
    brigade: {
        brigadeId: string;
        people: Persons[];
    };
    brigadeName: string;
    selectNewWorker: IdSelectedUser | null;
    setSelectNewWorker: React.Dispatch<
        React.SetStateAction<IdSelectedUser| null>
    >;
}

export function BrigadePeopleSection({
    brigade,
    brigadeName,
    selectNewWorker,
    setSelectNewWorker,
    personIdParam
}: Props) {

    return (

        <section
            className={styles['brigadePeopleSection']}
        >

            <h3
                className={styles['title']}
            >
                <span>

                    {brigadeName}

                </span>
            </h3>

            {brigade.people
                .filter((person) => person.id !== personIdParam)
                .map((person) => (

                WorkItemCardFactory.workItemCardActionOneProblems({
                    id: person.id,
                    name: person.name,
                    surname: person.surname,
                    otherSurname: person.other_surname,
                    job_title: person.job_title,
                    block: person.block,
                    discharge: person.discharge,
                    avalibleBlocks: person.he_can ?? [],

                    objectSelectUser: selectNewWorker,
                    onObjectSelectUser: setSelectNewWorker,

                    redAlarm: person.redAlarm,
                    yellowAlarm: person.yellowAlarm
                })

            ))}

        </section>

    );

}