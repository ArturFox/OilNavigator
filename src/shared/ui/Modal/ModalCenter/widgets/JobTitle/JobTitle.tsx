import styles from './JobTitle.module.scss';

interface JobTitleProps{
    jobTitle: string;
}

export function JobTitle(
    {
        jobTitle
    }: JobTitleProps
){

    return (

        <div className={styles['modal__blockInfo']}>

            <h5 className={styles['modal__nameCategory']}>
                Должность:
            </h5>

            <span>{jobTitle}</span>
        
        </div>

    )
}