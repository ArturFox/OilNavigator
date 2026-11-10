import type { BrigadeNavigationRowProps } from '@/shared/ui/BrigadeNavigation/BrigadeNavigationRow/types/typesBrigadeNavigationRow';
import styles from './BrigadeNavigationRow.module.scss';
import { ButtonItemDeleteBrigade } from '@/shared/ui/BrigadeNavigation/widgets/ButtonItemDeleteBrigade/ButtonItemDeleteBrigade';
import { ButtonItemCreateBrigade } from '@/shared/ui/BrigadeNavigation/widgets/ButtonItemCreateBrigade/ButtonItemCreateBrigade';
import { ButtonItemExistBrigade } from '@/shared/ui/BrigadeNavigation/widgets/ButtonItemExistBrigade/ButtonItemExistBrigade';
import { ButtonItemNoBrigade } from '@/shared/ui/BrigadeNavigation/widgets/ButtonItemNoBrigade/ButtonItemNoBrigade';

export function BrigadeNavigationRow (
    {
        brigadeList,

        isbrigadeSelectId,
        setIsBrigadeSelectId,

        setIsDelete,
        setIsCreate

    }:BrigadeNavigationRowProps
) {

    return (

        <ul
            className={styles['brigadeNavigationRow']}
        >

            {brigadeList.map((brigade) => {

                const currentBrigade: boolean = isbrigadeSelectId === brigade.id

                if (brigade.id === 'no_brigade') {

                    return (

                        <ButtonItemNoBrigade
                            currentBrigade={currentBrigade}
                            setIsBrigadeSelectId={setIsBrigadeSelectId}
                        />

                    );

                }
                
                return (

                    <ButtonItemExistBrigade
                        isFull={brigade.isFull}
                        id={brigade.id}
                        currentBrigade={currentBrigade}
                        numberBrigade={brigade.numberBrigade}
                        setIsBrigadeSelectId={setIsBrigadeSelectId}
                    />

                )

            })}

            <ButtonItemCreateBrigade
                setIsCreate={setIsCreate}
            />

            <ButtonItemDeleteBrigade
                setIsDelete={setIsDelete}
            />
                
        </ul>
    )
} 