import styles from './Title.module.scss'; 

interface TitleProps {
    name: string;
    surname: string;
    otherSurname: string;
}

export function Title(
    {
        name,
        surname,
        otherSurname
    }: TitleProps
){

    return (

        <h4 className={styles['modal__title']}>
            {surname} {name} {otherSurname}
        </h4>
    )
}