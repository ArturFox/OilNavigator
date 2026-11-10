import styles from './CurrentWorkerCard.module.scss';

type ObjectSelectUser = {
    id: string;
};

interface Props {
    id: string | null;
    name: string | null;
    surname: string | null;
    otherSurname: string | null;
    numberBrigade: number | null;
    jobTitle: string | null;
    block: string | null;
    discharge: number | null;
    avalibleBlocks: string[] | null;
    onIsOpenModalDetail: ((isOpenModalDetail: boolean) => void);
    objectSelectUser: ObjectSelectUser | null;
}

export function CurrentWorkerCard (
    {
        id,
        name,
        surname,
        otherSurname,
        block,
        jobTitle,
        numberBrigade,
        onIsOpenModalDetail,
        objectSelectUser
    }: Props
) {
    
    return (
        
        <article
            className={`
                ${styles["leftCard"]}
                ${id === null && styles["leftCard--notHuman"]}
                ${objectSelectUser && styles["leftCard--selected"]}
                 
            `}
        >
            {id === null 
                ? (
                    <span className={styles["leftCard__titleNotHuman"]}>
                        Человек отсутствует
                    </span>
                )

                : (
                    <>

                        <h3 className={styles["leftCard__blockBrigadeName"]}>
                            <span>
                                Бригада {numberBrigade ?? '(нету)'}
                            </span>
                        </h3>

                        <div className={styles["leftCard__blockPersonInfo"]}>
                            <span>
                                {surname} {name}
                            </span>
                            <span>
                                {otherSurname}
                            </span>
                        </div>
    
                        <div className={styles["leftCard__blockJob"]}>
                            <span>
                                Должность / блок:
                            </span>
                            <span className={styles["leftCard__jobText"]}>
                                {jobTitle} / {block}
                            </span>
                        </div>
        
                        <div className={`${styles["leftCard__blockProblem"]}`}> 

                            <span className={styles["leftCard__titleProblem"]}>
                                
                                Проблемы
                                
                            </span>

                            
                                
                            <span className={styles["leftCard__textProblem"]}>
                                7
                            </span>
                                
                        </div>

                        <button
                            className={`${styles["leftCard__acceptButton"]}`}
                            onClick={() => onIsOpenModalDetail(true)}
                        >
                            Подробнее
                        </button>
                    </>
                )
            }
        </article>

    );

}
