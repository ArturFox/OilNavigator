import type { Dispatch, SetStateAction } from 'react';
import styles from './DontHavePerson.module.scss';
import { WorkItemCardFactory } from '@/shared/ui/WorkerItemCard/WorkItemCardFactory';

interface Props {
    howMatch: number;
    shouldRedirect: boolean; 
    setShouldRedirect: (shouldRedirect: boolean) => void;
    brigadeId: string;
    setTargetBrigadeId: Dispatch<SetStateAction<string | null>>
}

export function DontHavePerson(
    {
        howMatch,
        shouldRedirect,
        setShouldRedirect,
        brigadeId,
        setTargetBrigadeId
    }: Props
){   

    return (

        <li
            className={styles['brigadeSlide']}
        >

            <ul
                className={styles['brigadeSlide__peopleList']}
            >

                {Array.from({length: howMatch}).map((_, index) => {

                    return(
                        
                        <WorkItemCardFactory.workItemCardActionEmpty
                            key={`${index}`}
                            shouldRedirect={shouldRedirect}
                            setShouldRedirect={setShouldRedirect}
                            brigadeId={brigadeId}
                            setTargetBrigadeId={setTargetBrigadeId}
                        />

                    )

                })}

            </ul>

        </li>

    );
    
} 