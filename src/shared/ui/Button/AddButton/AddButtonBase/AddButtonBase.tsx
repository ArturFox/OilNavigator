import { Plus } from 'lucide-react';
import styles from './AddButtonBase.module.scss';
import type { AddButtonBaseProps } from '@/shared/ui/Button/AddButton/AddButtonBase/types/typesAddButtonBase';

export function AddButtonBase(
    {
        isOpenModal,
        onIsOpenModal,
        setTargetBrigadeId,
        brigadeId
    }: AddButtonBaseProps
){

    return(

        <div
            className={styles["selectionButton"]}
        >
            <button
                className={`
                    ${styles['selectionButton__button']}
                    
                `}
                onClick={() => {
                    onIsOpenModal(!isOpenModal)
                    setTargetBrigadeId(brigadeId)
                }}
            >

                <Plus/>

            </button>
            
        </div>
    )
}