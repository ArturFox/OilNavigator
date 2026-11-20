import type { Persons } from '@/entities/persons/types/persons.dto';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';
import type { ObjectSelectUserReplaseWorkerCoreAdd } from '@/pages/ReplaceWorker/ReplaseWorkerCoreAdd/types/typesReplaseWorkerCoreAdd';
import styles from './BrigadePeopleSectionCoreAdd.module.scss';

interface Props {
    brigade: {
        brigadeId: string;
        people: Persons[];
    };
    brigadeName: string | null;
    selectNewWorker: ObjectSelectUserReplaseWorkerCoreAdd | null;
    setSelectNewWorker: React.Dispatch<
        React.SetStateAction<ObjectSelectUserReplaseWorkerCoreAdd | null>
    >;
}

export function BrigadePeopleSectionCoreAdd({
    brigade,
    brigadeName,
    selectNewWorker,
    setSelectNewWorker,
}: Props) {

    return (

        <section
            className={styles['brigadePeopleSection']}
        >

            <h3
                className={styles['title']}
            >
                <span>

                    {brigadeName
                        ? brigadeName
                        : 'Без бригады'
                            
                    }

                </span>
            </h3>

            {brigade.people.map((person) => (

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