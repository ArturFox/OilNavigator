import { ButtonFactory } from '@/shared/ui/Button/ButtonFactory';
import styles from './WorkItemCardActionEmpty.module.scss';
import type { WorkItemCardActionEmptyProps } from '@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/types/typesWorkItemCardActionEmpty';

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
            className={styles['peopleItem-notPerson']}
            
        >

            <span
                className={styles['peopleItem-notPerson-text']}
            >
                Нету Человека
            </span>
            
            <ButtonFactory.addButtonBase
                isOpenModal={shouldRedirect}
                onIsOpenModal={setShouldRedirect} 
                brigadeId={brigadeId}
                setTargetBrigadeId={setTargetBrigadeId}
            />

        </li>
        
    )
}