import styles from './Birthday.module.scss';

export function Birthday() {

    return (

        <div className={styles['modal__blockInfo']}>

            <h5 className={styles['modal__nameCategory']}>
                День рождения:
            </h5>

            <span>-</span>

        </div>
    )
}