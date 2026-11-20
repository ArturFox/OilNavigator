import styles from './ButtonItemExistBrigade.module.scss';

interface Props {
    isFull: boolean;
    id: string;
    currentBrigade: boolean;
    numberBrigade: number;
    setIsBrigadeSelectId: (brigadeClick: string) => void;
}
export function ButtonItemExistBrigade (
    {
        isFull,
        id,
        currentBrigade,
        numberBrigade,
        setIsBrigadeSelectId
    }: Props
) {

    return(

        <li
            className={`
                ${styles['buttonItemExistBrigade']}
                ${!isFull 
                    ? currentBrigade
                        ? styles['buttonItemExistBrigade--current']
                        : styles['buttonItemExistBrigade--problem']
                    : ''
                }
                ${currentBrigade && styles['buttonItemExistBrigade--current']}
            `}
            
        >

            <button
                onClick={() => {
                    setIsBrigadeSelectId(id);
                }}
                className={`
                    ${styles['buttonItemExistBrigade__button']}
                `}
            >
                {numberBrigade}
            </button>

        </li>

    )

}