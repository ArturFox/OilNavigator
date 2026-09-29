import { Plus } from 'lucide-react';
import styles from './ButtonBlockPlus.module.scss';

export function ButtonBlockPlus () {

    return(

        <div
            className={styles['ButtonBlock']}
        >

            <button
                className={styles['ButtonBlock__button']}
            >

                <Plus size={32}/>

            </button>

            <div
                className={styles['ButtonBlock__label']}
            >

                Добавить

            </div>

        </div>

    )

}