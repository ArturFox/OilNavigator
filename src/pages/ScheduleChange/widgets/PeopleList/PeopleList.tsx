import { useState } from 'react';
import styles from './PeopleList.module.scss';
import type { Brigade } from '../../../../entities/brigades/types/brigades.dto';
import type { Persons } from '../../../../entities/persons/types/persons.dto';
import { PeopleBrigade } from '../PeopleBrigade/PeopleBrigade';

interface Props {
    brigadeSortArr: Brigade[];
    peopleMap: Map<string, Persons[]>;
    currentIndex: number;
    onBrigadeClick: (id: string) => void;
}

export function PeopleList(
    {
        brigadeSortArr,
        peopleMap,
        currentIndex,
        onBrigadeClick
    }: Props) 
{

    const [touchStart, setTouchStart] = useState(0);
    
    const [dragOffset, setDragOffset] = useState(0);
    
    const [isDragging, setIsDragging] = useState(false);

    function handleTouchStart(event: React.TouchEvent) {

        setTouchStart(event.touches[0].clientX);
        setIsDragging(true);
        
    }

    function handleTouchMove(event: React.TouchEvent) {

        if (!isDragging) return;
        
        const currentX = event.touches[0].clientX;
        const difference = currentX - touchStart;

        const isFirst = currentIndex === 0;
        const isLast = currentIndex === brigadeSortArr.length - 1;

        if ((isFirst && difference > 0) || (isLast && difference < 0)) {
            
            setDragOffset(difference / 3);
        } else {
            setDragOffset(difference);
        }
    }

    function handleTouchEnd() {

        if (!isDragging) return;

        setIsDragging(false);

        const threshold = 100;

        if (dragOffset < -threshold && currentIndex < brigadeSortArr.length - 1) {
            
            onBrigadeClick(brigadeSortArr[currentIndex + 1].id);
        } else if (dragOffset > threshold && currentIndex > 0) {
            
            onBrigadeClick(brigadeSortArr[currentIndex - 1].id);
        }

        setDragOffset(0);
    }

    return (
        <article 
            className={styles['peopleListWrapper']}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <ul
                className={styles['peopleListWrapper__peopleList']}
                style={{
                    
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                    
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
            >
                {brigadeSortArr.map((brigade) => {
                    const brigadePeople = peopleMap.get(brigade.id) || [];
                    const doYouHaveAllPeople = brigadePeople.length >= 7;
                    const howMatch = doYouHaveAllPeople ? 0 : 7 - brigadePeople.length;

                    return (
                        <PeopleBrigade
                            key={brigade.id}
                            brigade={brigade}
                            peopleArr={brigadePeople}
                            howMatchNotPersons={brigade.id === 'no_brigade' ? undefined : howMatch}
                        />
                    );
                })}
            </ul>
        </article>
    );
}