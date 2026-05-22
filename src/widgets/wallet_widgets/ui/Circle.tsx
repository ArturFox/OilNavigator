import styles from '../../../styles/blocks/wallet.module.scss'

export function Circle () {
    return (
        <div className={styles['main__block']}>

            <span className={styles['main__text']}>
                Транспорт
            </span>

            <span className={styles['main__text']}>
                0P
            </span>

            <div className={styles['main__circle']}>

            </div>

            <span className={styles['main__text']}>
                0P
            </span>

        </div>
    )
}