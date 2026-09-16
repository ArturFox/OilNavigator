import { ArrowRightLeft, Pen, Plus, Search } from 'lucide-react';
import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import styles from './BrigadeChange.module.scss';
import { useState } from 'react';
import type { Persons } from '../../../../entities/persons/types/persons.dto';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

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

    const [_, onBrigadeClick] = useState<string>('no_brigade');

    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        
        <section className={styles['brigadeChange']}>

            <ul
                className={styles['brigadeChange__brigadeList']}
            >

                {brigadeSortArr.map((brigade, index) => {

                    if (brigade.id === 'no_brigade') {

                        return (

                            <li key={brigade.id}>

                                <button
                                    className={styles['brigadeChange__brigadeItemButton']}
                                    onClick={() => {
                                        onBrigadeClick(brigade.id);
                                        swiper?.slideTo(index);
                                    }}
                                >
                                    0
                                </button>
                            </li>
                        );
                    }

                    const currentPeople = peopleMap.get(brigade.id) ?? [];

                    const doYouHaveAllPeople: boolean = currentPeople.length >= 7;
                    
                    return (

                        <li
                            key={brigade.id}
                           
                        >

                            <button
                                className={`
                                    ${styles['brigadeChange__brigadeItemButton']}
                                    ${!doYouHaveAllPeople && styles['brigadeChange__brigadeItemButton--red']}
                                `}
                                onClick={() => {

                                    onBrigadeClick(brigade.id);

                                    swiper?.slideTo(index);

                                }}
                            >
                                {brigade.number_brigade}
                            </button>

                        </li>

                    )

                })}

                <li
                    className={styles['brigadeChange__brigadeItemButton']}
                >
                    <Plus/>
                </li>
                
            </ul>

            <article
                className={styles['brigadeChange__peopleBlock']}
            >

                <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={(swiper) => {

                        const brigade = brigadeSortArr[swiper.activeIndex];

                        if (brigade) {
                            onBrigadeClick(brigade.id);
                        }

                    }}
                    className={styles['brigadeChange__peopleSwiper']}
                >

                    {brigadeSortArr.map((brigade) => {

                        const currentPeople = peopleMap.get(brigade.id) || [];

                        if(brigade.id === 'no_brigade') {

                            return (
                                <SwiperSlide
                                    key={brigade.id}
                                    className={styles['brigadeChange__peopleSlide']}
                                >

                                    <h3
                                        className={styles['brigadeChange__peopleTitle']}
                                    >
                                        {brigade.name}
                                    </h3>

                                    <ul
                                        className={styles['brigadeChange__peopleList']}
                                    >

                                        {currentPeople.map((person) => (

                                            <li key={person.id}>
                                                {person.name}
                                            </li>

                                        ))}

                                    </ul>

                                </SwiperSlide>
                            )
                        }

                        const doYouHaveAllPeople: boolean = currentPeople.length >= 7;

                        let howMatch = 0;

                        if(!doYouHaveAllPeople){
                            howMatch = 7 - currentPeople.length;
                        }


                        return (

                            <SwiperSlide
                                key={brigade.id}
                                className={styles['brigadeChange__peopleSlide']}
                            >

                                <h3
                                    className={styles['brigadeChange__peopleTitle']}
                                >
                                    {brigade.name}
                                </h3>

                                <ul
                                    className={styles['brigadeChange__peopleList']}
                                >

                                    {currentPeople.map((person) => (

                                        <li 
                                            key={person.id}
                                            className={styles['brigadeChange__peopleItem']}
                                        >
                                            <span
                                                className={styles['brigadeChange__peopleItem-name']}
                                            >
                                                {person.surname} {person.name}
                                            </span>

                                           <div>
                                                <button
                                                    className={styles['brigadeChange__peopleItem-button']}
                                                >
                                                    <ArrowRightLeft/>
                                                </button>

                                                <button
                                                    className={styles['brigadeChange__peopleItem-button']}
                                                >
                                                    <Search/>
                                                </button>
                                           </div>
                                        </li>

                                    ))}

                                    {howMatch > 0 && Array.from({length: howMatch+30}).map((_, index) => (

                                        <li key={`${index}+notPerson`}>
                                            Отсутствует человек
                                        </li>

                                    ))}

                                </ul>

                            </SwiperSlide>
                        );

                    })}

                </Swiper>

            </article>

        </section>
    );
}