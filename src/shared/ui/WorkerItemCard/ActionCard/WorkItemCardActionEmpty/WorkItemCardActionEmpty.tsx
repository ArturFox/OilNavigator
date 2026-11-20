import styles from './WorkItemCardActionEmpty.module.scss';
import type { WorkItemCardActionEmptyProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/types/typesWorkItemCardActionEmpty';
import { Plus } from 'lucide-react';

export function WorkItemCardActionEmpty (
    {
        shouldRedirect,
        setShouldRedirect,
        brigadeId,
        setTargetBrigadeId
    }: WorkItemCardActionEmptyProps
){

    return (

        <li
            className={styles['workItemCardActionEmpty']}
            
        >

            <span
                className={styles['workItemCardActionEmpty__text']}
            >
                Нету Человека
            </span>
            
            <div
                className={styles["workItemCardActionEmpty__selectionButton"]}
            >
                <button
                    className={`
                        ${styles['workItemCardActionEmpty__selectionButton-button']}
                        
                    `}
                    onClick={() => {
                        setShouldRedirect(!shouldRedirect)
                        setTargetBrigadeId(brigadeId)
                    }}
                >

                    <Plus/>

                </button>
                
            </div>

        </li>
        
    )
}