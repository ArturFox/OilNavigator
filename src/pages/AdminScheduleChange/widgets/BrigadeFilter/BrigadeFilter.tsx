import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import styles from './BrigadeFilter.module.scss';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
    brigades: Brigade[];
    selectBrigade: Brigade[];
    onSelectBrigade: Dispatch<SetStateAction<Brigade[]>>
}

export function BrigadeFilter (
    {
        brigades,
        selectBrigade,
        onSelectBrigade
    }: Props
) {

    return(

        <ul
            className={styles['calendar__selectButtons']}
        >

            {brigades.map((brigade) => {

                const have: boolean = selectBrigade.some((b) => b.id === brigade.id);

                return (

                    <li
                    >

                        <button
                            onClick={() => {

                                have 
                                ? onSelectBrigade((prev) => prev.filter((b) => b.id !== brigade.id))
                                : onSelectBrigade((prev) => [...prev, brigade])
                            }}
                            className={`
                                ${styles['calendar__selectButtons-item']}
                                ${have && styles['calendar__selectButtons-item--active']}
                            `}
                        >

                            {brigade.number_brigade}

                        </button>

                    </li>
                )

            })}

        </ul>   
    )
}