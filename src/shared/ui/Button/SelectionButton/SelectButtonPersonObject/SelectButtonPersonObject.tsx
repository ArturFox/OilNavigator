import styles from './SelectButtonPersonObject.module.scss'
import type { SelectButtonPersonObjectProps } from '@/shared/ui/Button/SelectionButton/SelectButtonPersonObject/types/typesSelectButtonPersonObject';

export function SelectButtonPersonObject(
    {
        id,
        objectSelectUser,
        onObjectSelectUser
    }: SelectButtonPersonObjectProps
) {

    const isSelected: boolean = objectSelectUser !== null && objectSelectUser.id !== null
    ? objectSelectUser.id === id
    : false;
 
    return (

        <div
            className={styles["selectionButton"]}
        >
            <button
                className={`
                    ${styles['selectionButton__button']}
                    ${isSelected && styles["selectionButton__button--selected"]}
                `}
                onClick={() => {

                    if(isSelected){
                        onObjectSelectUser(null)
                    }else{
                        onObjectSelectUser({id: id})
                    }
                }}
            >
                {isSelected
                    ? 'Выбран'
                    : 'Выбрать'
                }
            </button>
            
        </div>
        
    )

}