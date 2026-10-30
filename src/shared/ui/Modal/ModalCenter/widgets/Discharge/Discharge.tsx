import styles from './Discharge.module.scss';

interface DishargeProps {
    discharge: number;
}

export function Discharge(
    {
        discharge
    }: DishargeProps
){

    return (

        <div className={styles['modal__blockInfo']}>

            <h5 className={styles['modal__nameCategory']}>
                Разряд:
            </h5>

            <span>{discharge}</span>

        </div>

    )
}