import styles from './Identity.module.scss';

interface Props {
    name: string;
    surname: string;
    otherSurname: string;
}

export function Identity (
    {
        name,
        surname,
        otherSurname
    }: Props
) {

    return (
        <div
            className={styles["identity"]}
        >
            <span
                className={styles["identity__info"]}
            >
                {surname} {name} {otherSurname}
            </span>

        </div>
    )
}