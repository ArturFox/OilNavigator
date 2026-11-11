import { DontHavePerson } from "@/pages/CoreStaffReplacementPage/widgets/DontHavePerson/DontHavePerson";
import { PeopleList } from "@/pages/CoreStaffReplacementPage/widgets/PeopleList/PeopleList";
import styles from './BrigadeWorkersSlider.module.scss';
import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import type { Persons } from "@/entities/persons/types/persons.dto";
import type { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

interface BrigadeWorkersSliderProps {
    currentIndex: number;
    dragOffset: number;
    isDragging: boolean;

    handleTouchStart: (event: React.TouchEvent<HTMLElement>) => void;
    handleTouchMove: (event: React.TouchEvent<HTMLElement>) => void;
    handleTouchEnd: () => void;

    brigadeSortArr: Brigade[];
    peopleMap: Map<string, Persons[]>;

    shouldRedirect: boolean;
    setShouldRedirect: Dispatch<SetStateAction<boolean>>;
    setTargetBrigadeId: Dispatch<SetStateAction<string | null>>;

    listSelectedUsers: string[];
    onListSelectedUsers: Dispatch<SetStateAction<string[]>>;
    buttonSelectCheck: boolean;

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    onApply: Dispatch<SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;
}

export function BrigadeWorkersSlider({
    currentIndex,
    dragOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    brigadeSortArr,
    peopleMap,
    shouldRedirect,
    setShouldRedirect,
    setTargetBrigadeId,
    listSelectedUsers,
    onListSelectedUsers,
    buttonSelectCheck,
    brigadesIdAndNumbers,
    onApply,
}: BrigadeWorkersSliderProps) {

    console.log(currentIndex)

    const [sliderHeight, setSliderHeight] = useState<number>(1000);
    const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

    useLayoutEffect(() => {

        const currentSlide = slideRefs.current[currentIndex];

    console.log('Текущий элемент:', currentSlide);
    console.log('Высота:', currentSlide?.offsetHeight);
    console.log('Размеры:', currentSlide?.getBoundingClientRect());

        if (currentSlide) {
            setSliderHeight(currentSlide.offsetHeight);
        }
        
    }, [currentIndex, brigadeSortArr, peopleMap]);

    return (
        <section
            className={styles['brigadeWorkersSlider']}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >

            <ul
                className={styles['brigadeWorkersSlider__track']}
                style={{

                    height: `${sliderHeight}px`,
                    
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                    
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
            >

                {brigadeSortArr.map((brigade, index) => {

                    const brigadePeople: Persons[] = peopleMap.get(brigade.id) ?? [];
                    const doYouHaveAllPeople: boolean = brigadePeople.length >= 7;
                    const howMatch: number = doYouHaveAllPeople ? 0 : 7 - brigadePeople.length;
                    
                    if(brigadePeople.length === 0 && brigade.id === 'no_brigade'){

                        console.log('zzz')
                        return (

                            <li
                                ref={(element) => {
                                    slideRefs.current[index] = element;
                                }}
                                className={`
                                    ${styles['brigadeWorkersSlider__track-slide']}
                                    ${styles['brigadeWorkersSlider__track-slide-dontHavePeople']}
                                `}
                            >
                                Людей нету
                            </li>
                        )
                    }

                    return (

                        <li
                            ref={(element) => {
                                slideRefs.current[index] = element;
                            }}
                            key={brigade.id}
                            className={styles['brigadeWorkersSlider__track-slide']}
                        >
                            

                            {(!doYouHaveAllPeople && brigade.id !== 'no_brigade') &&
                                <DontHavePerson
                                    howMatch={howMatch}
                                    shouldRedirect={shouldRedirect}
                                    setShouldRedirect={setShouldRedirect}
                                    brigadeId={brigade.id}
                                    setTargetBrigadeId={setTargetBrigadeId}
                                />
                            }

                            <PeopleList
                                brigadeId={brigade.id}
                                brigadePeople={brigadePeople}
                                listSelectedUsers={listSelectedUsers}
                                onListSelectedUsers={onListSelectedUsers}
                                buttonSelectCheck={buttonSelectCheck}
                                brigadesIdAndNumbers={brigadesIdAndNumbers}
                                onApply={onApply}
                            />

                        </li>

                    );

                })}

            </ul>

        </section>
    )
}