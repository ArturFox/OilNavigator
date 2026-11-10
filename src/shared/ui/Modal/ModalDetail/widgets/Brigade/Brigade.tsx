import styles from './Brigade.module.scss';

export function Brigade() {

    return (

        <div className={styles['modal__blockInfo']}>

            <h5 className={styles['modal__nameCategory']}>
                Бригада:
            </h5>

            <span>пока нету</span>

        </div>

    )
}