import type { SelectButtonBaseProps } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/types/typesSelectButtonBase';
import styles from './SelectButtonBase.module.scss'

export function SelectButtonBase(
    {
        isOpenModal,
        onIsOpenModal
    }: SelectButtonBaseProps
) {
 
    return (

        <div
            className={styles["selectionButton"]}
        >
            <button
                className={`
                    ${styles['selectionButton__button']}
                    ${isOpenModal && styles["selectionButton__button--selected"]}
                `}
                onClick={() => onIsOpenModal(!isOpenModal)}
            >
                {isOpenModal
                    ? 'Выбран'
                    : 'Выбрать'
                }
            </button>
            
        </div>
        
    )

}