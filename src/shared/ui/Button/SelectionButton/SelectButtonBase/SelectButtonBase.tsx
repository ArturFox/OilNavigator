import type { SelectButtonBaseProps } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/types/typesSelectButtonBase';
import styles from './SelectButtonBase.module.scss'

type PersonObj = {
    id: string;
    name: string;
    surname: string;   
}

export function SelectButtonBase(
    {
        id,
        name,
        surname,
        isOpenModal,
        onListSelectedUsers

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
                onClick={() => onListSelectedUsers((prev) => {

                    if(isOpenModal){
                        return prev.filter((person) => person.id !== id);
                    }

                    const newPerson: PersonObj = {
                        id: id,
                        name: name,
                        surname: surname,
                    };

                    return [...prev, newPerson]
                })}
            >
                {isOpenModal
                    ? 'Выбран'
                    : 'Выбрать'
                }
            </button>
            
        </div>
        
    )

}