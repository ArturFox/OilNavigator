import styles from './Block.module.scss';

interface BlockProps {
    block: string;
}

export function Block(
    {
        block
    }: BlockProps
){

    return (
        <div className={styles['modal__blockInfo']}>
            <h5 className={styles['modal__nameCategory']}>
                Блок:
            </h5>
            <span>{block}</span>
        </div>
    )
}