import styles from './NewWorkerCard.module.scss';

type ObjectSelectUser = {
    id: string;
};

interface NewWorkerCardProps {
    id: string | null;
    name: string | null;
    surname: string | null;
    otherSurname: string | null;
    numberBrigade: number | null;
    jobTitle: string | null;
    block: string | null;
    discharge: number | null;
    avalibleBlocks: string[] | null;
    objectSelectUser: ObjectSelectUser | null;
    setApply: (apply: boolean) => void;
}

export function NewWorkerCard (
    {
        id,
        name,
        surname,
        otherSurname,
        block,
        jobTitle,
        numberBrigade,
        objectSelectUser,
        setApply
    }: NewWorkerCardProps
) {

    return (

        <article
            className={`
                ${styles["rightCard"]}
                ${id === null && styles["rightCard--notHuman"]}
                ${objectSelectUser && styles["rightCard--selected"]}
            `}
        >
            
            {id === null 
                ? 
                    <span
                        className={styles["rightCard__titleAddHuman"]}
                    >
                        Выберите человека
                    </span>
                : 
                <>
                    <h3
                        className={styles["rightCard__blockBrigadeName"]}
                    >

                        <span>

                            Бригада {numberBrigade ?? '(нету)'}

                        </span>

                    </h3>

                    <div
                        className={styles["rightCard__blockPersonInfo"]}
                    >

                        <span
                            className={styles["rightCard__surnameName"]}
                        >

                            {surname} {name}

                        </span>

                        <span
                            className={styles["rightCard__otherSurname"]}
                        >
                            {otherSurname}
                        </span>

                    </div>

        
                    <div
                        className={styles["rightCard__blockJob"]}
                    >

                        <span>
                            Должность / блок:
                        </span>

                        <span
                            className={styles["rightCard__jobText"]}
                        >
                            {jobTitle} / {block}
                        </span>

                    </div>
                

                    <div
                        className={`
                            ${styles["rightCard__blockProblem"]}
                        `}
                    >   

                        <span
                            className={styles["rightCard__titleProblem"]}
                        >
                            
                            Проблемы
                            
                        </span>

                        
                        <span
                            className={styles["rightCard__textProblem"]}
                        >

                            7

                        </span>
                            
                    </div>
                        
                    
                    <button
                        className={`
                            ${styles["rightCard__acceptButton"]}
                            ${objectSelectUser?.id !== null && styles["rightCard__acceptButton--selected"]}
                        `}
                        onClick={() => setApply(true)}
                    >
                        Применить
                    </button>
                </>
            }

        </article>
    )
}