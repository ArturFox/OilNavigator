import { Plus } from 'lucide-react';
import styles from './AddButtonBase.module.scss';
import type { AddButtonBaseProps } from '@/shared/ui/Button/AddButton/AddButtonBase/types/typesAddButtonBase';

export function AddButtonBase(
    {
        isOpenModal,
        onIsOpenModal
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
                onClick={() => onIsOpenModal(!isOpenModal)}
            >

                <Plus/>

            </button>
            
        </div>
    )
}