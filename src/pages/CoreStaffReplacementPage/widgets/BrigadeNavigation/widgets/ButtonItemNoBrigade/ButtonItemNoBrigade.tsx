import styles from './ButtonItemNoBrigade.module.scss';

interface Props {
    currentBrigade: boolean,
    setIsBrigadeSelectId: (brigadeClick: string) => void;
}

export function ButtonItemNoBrigade (
    {
        currentBrigade,
        setIsBrigadeSelectId
    }: Props
) {

    return (

        <li 
            className={`
                ${styles['buttonItemNoBrigade']}
                ${currentBrigade && styles['buttonItemNoBrigade--current']}    
            `}
        >

            <button
                onClick={() => {
                    setIsBrigadeSelectId('no_brigade');
                }}
                className={`
                    ${styles['buttonItemNoBrigade__button']}
                `}
            >
                0
            </button>

        </li>

    )
}