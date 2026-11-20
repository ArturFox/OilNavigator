import { DontHavePerson } from "@/pages/CoreStaffReplacementPage/widgets/BrigadeWorkersSlider/widgets/DontHavePerson/DontHavePerson";
import { PeopleList } from "@/pages/CoreStaffReplacementPage/widgets/BrigadeWorkersSlider/widgets/PeopleList/PeopleList";
import styles from './BrigadeWorkersSlider.module.scss';
import type { Persons } from "@/entities/persons/types/persons.dto";
import { useLayoutEffect, useRef, useState } from 'react';
import type { BrigadeWorkersSliderProps } from "@/pages/CoreStaffReplacementPage/widgets/BrigadeWorkersSlider/types/typesBrigadeWorkersSlider";

export function BrigadeWorkersSlider(
    {

        // хук useSwipe
        currentIndex,
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,

        // хук useManageSeveralWorkItemCards
        isButtonSelectCheck,

        listSelectedUsers,
        setListSelectedUsers,

        isOpenModalSeveral,
        setIsOpenModalSeveral,

        setIsApplymodalReplaceSeveral,

        // хук useManageOnlyOneWorkItemCards
        setIsApplymodalReplaceOnlyOne,

        // хук useRedirectEmptyCard
        isShouldRedirect,
        setIsShouldRedirect,
        setTargetBrigadeId,

        // Передаем массив бригад, по которому формируются слайды 
        // и распределяются сотрудники в соответствии с их brigade_id
        brigadeSortArr,

        // Передаём сотрудников, распределённых по своим бригадам (ключ — ID бригады)
        peopleMap,

        // Нужен чтобы отображать в модалках список бригад
        brigadesIdAndNumbers,

        // Для отображания в ModalReplaceSeveralSelect списка выбранных людей
        arrSelectButton,
    }: BrigadeWorkersSliderProps
) {

    const [sliderHeight, setSliderHeight] = useState<number>(0);
    const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

    useLayoutEffect(() => {

        const currentSlide = slideRefs.current[currentIndex];

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

                    height: `${Math.max(sliderHeight, 700)}px`,
                    
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                    
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
            >

                {brigadeSortArr.map((brigade, index) => {

                    const brigadePeople: Persons[] = peopleMap.get(brigade.id) ?? [];
                    const doYouHaveAllPeople: boolean = brigadePeople.length >= 7;
                    const howMatch: number = doYouHaveAllPeople ? 0 : 7 - brigadePeople.length;
                    
                    if(brigadePeople.length === 0 && brigade.id === 'no_brigade'){

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
                                    brigadeId={brigade.id}

                                    // хук useRedirectEmptyCard
                                    shouldRedirect={isShouldRedirect}
                                    setShouldRedirect={setIsShouldRedirect}
                                    setTargetBrigadeId={setTargetBrigadeId}
                                    
                                />
                            }

                            <PeopleList

                                // хук useManageSeveralWorkItemCards
                                isButtonSelectCheck={isButtonSelectCheck}

                                isOpenModalSeveral={isOpenModalSeveral}
                                setIsOpenModalSeveral={setIsOpenModalSeveral}

                                listSelectedUsers={listSelectedUsers}
                                setListSelectedUsers={setListSelectedUsers}

                                setIsApplymodalReplaceSeveral={setIsApplymodalReplaceSeveral}

                                // хук useManageOnlyOneWorkItemCards
                                setIsApplymodalReplaceOnlyOne={setIsApplymodalReplaceOnlyOne}

                                // Нужен чтобы отображать в модалках список бригад
                                brigadesIdAndNumbers={brigadesIdAndNumbers}

                                // Для отображания в ModalReplaceSeveralSelect списка выбранных людей
                                arrSelectButton={arrSelectButton}

                                brigadeId={brigade.id}
                                brigadePeople={brigadePeople}
                                isActiveSlide={index === currentIndex}
                            />

                        </li>

                    );

                })}

            </ul>

        </section>
    )
}