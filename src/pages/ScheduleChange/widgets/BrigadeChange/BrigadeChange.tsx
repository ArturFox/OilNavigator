import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import styles from './BrigadeChange.module.scss';
import { useState } from 'react';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import { BrigadeList } from './components/BrigadeList';
import { PeopleList } from './components/PeopleList';

interface Props {
    brigadeSortArr: Brigade[];
    peopleMap: Map<string, Persons[]>;
}

export function BrigadeChange(
    { 
        brigadeSortArr,
        peopleMap
    }: Props
) {

    const [brigadeClick, onBrigadeClick] = useState<string>('no_brigade');

    const currentIndex: number = brigadeSortArr.findIndex(
        (brigade) => brigade.id === brigadeClick
    );

    return (
        
        <section 
            className={styles['brigadeChange']}
        >

            <BrigadeList
                brigadeSortArr={brigadeSortArr}
                brigadeClick={brigadeClick}
                onBrigadeClick={onBrigadeClick}
                peopleMap={peopleMap}
            />

            <h3
                className={styles['brigadeChange__title']}
            >
                {brigadeSortArr[currentIndex].name}
            </h3>

            <PeopleList
                brigadeSortArr={brigadeSortArr}
                peopleMap={peopleMap}
                currentIndex={currentIndex}
            />

        </section>
    );
}