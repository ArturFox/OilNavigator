import type { DetailButtonBaseProps } from '@/shared/ui/Button/DetailButton/DetailButtonBase/types/typesDetailButtonBase';
import styles from './DetailButtonBase.module.scss';

export function DetailButtonBase (
    {
        onModalCenter,
        modalCenter
    }: DetailButtonBaseProps
) {

    return (

        <div
            className={styles["detailsButton"]}
        >
            <button
                className={styles["detailsButton__button"]}
                onClick={() => onModalCenter(!modalCenter)}
            >
                Подробнее
            </button>
            
        </div>
    )
}