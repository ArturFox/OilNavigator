import styles from './SelectButtonPerson.module.scss'
import type { SelectButtonPersonProps } from '@/shared/ui/Button/SelectionButton/SelectButtonPerson/types/typesSelectButtonPerson';

export function SelectButtonPerson(
    {
        id,
        listSelectedUsers,
        onListSelectedUsers

    }: SelectButtonPersonProps
) {

    const isOpenModal = listSelectedUsers.includes(id);

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
                        return prev.filter((personId) => personId !== id);
                    }

                    return [...prev, id];
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