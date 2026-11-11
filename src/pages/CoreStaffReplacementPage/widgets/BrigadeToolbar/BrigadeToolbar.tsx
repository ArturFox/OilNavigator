import { toast } from 'sonner';
import styles from './BrigadeToolbar.module.scss';
import { Check } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
    currentNameBrigade: string;
    buttonSelectCheck: boolean;
    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>
    openModalSeveral: boolean;
    onOpenModalSeveral: (openModalSeveral: boolean) => void;
    onButtonSelectCheck: (buttonSelectCheck: boolean) => void;
}

export function BrigadeToolbar (
    {
        currentNameBrigade,
        buttonSelectCheck,
        listSelectedUsers,
        onListSelectedUsers,
        openModalSeveral,
        onOpenModalSeveral,
        onButtonSelectCheck
    }: Props
) {

    return (

        <section
            className={styles['brigadeToolbar']}
        > 

            <h3>

                <span
                    className={styles['brigadeToolbar__title']}
                >
                    {currentNameBrigade} 
                </span>

            </h3>

            <article
                className={styles['brigadeToolbar__actions']}
            >

                <button 
                    className={`
                        ${styles['brigadeToolbar__actions-applyButton']}
                        ${buttonSelectCheck && styles['brigadeToolbar__actions-applyButton--active']}
                        ${listSelectedUsers.length > 1 && styles['brigadeToolbar__actions-applyButton--apply']}
                    `}
                    onClick={() => {

                        if (listSelectedUsers.length === 0) {
                            
                            toast.error('Необходимо выбрать сотрудников');
                            return;
                        }

                        if (listSelectedUsers.length === 1) {
                            
                            toast.error('Необходимо выбрать минимум двоих');
                            return;
                        }

                        onOpenModalSeveral(!openModalSeveral);
                    }}
                >
                    Применить
                </button>
                

                <button
                    className={`
                        ${styles['brigadeToolbar__actions-selectionToggle']}
                    `}
                    onClick={() => {
                        const nextSelectSeveral = !buttonSelectCheck;

                        onButtonSelectCheck(nextSelectSeveral);

                        if (!nextSelectSeveral) {
                            onListSelectedUsers([]);
                            onOpenModalSeveral(false);
                        }
                    }}
                >

                    <Check
                        className={` 
                            ${styles['brigadeToolbar__actions-selectionToggle-check']}
                            ${buttonSelectCheck && styles['brigadeToolbar__actions-selectionToggle-check--active']} 
                        `}
                    /> 

                </button>

            </article>  

        </section>
    )
}