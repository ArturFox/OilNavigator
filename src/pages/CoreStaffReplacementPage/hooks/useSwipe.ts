import React, { useEffect, useState } from "react";

interface UseSwipeProps {
    brigadesArr: { id: string }[];
}

export function useSwipe({
    brigadesArr,
}: UseSwipeProps) {

    // Пользователь в компоненте BrigadeNavigationRow 
    // нажимает на бригаду и она записывается в это состояние
    const [isbrigadeSelectId, setIsbrigadeSelectId] = useState<string>('no_brigade');

    useEffect(() => {

        const isBrigadeExist = brigadesArr.some(
            (brigade) => brigade.id === isbrigadeSelectId
        );

        if (!isBrigadeExist && brigadesArr.length > 0) {
            setIsbrigadeSelectId('no_brigade');
        }

    }, [brigadesArr, isbrigadeSelectId]);

    const currentIndex: number = Math.max(
        0,
        brigadesArr.findIndex(
            (brigade) => brigade.id === isbrigadeSelectId
        )
    );

    const [touchStart, setTouchStart] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);

    const [isDragging, setIsDragging] = useState(false);

    const [dragOffset, setDragOffset] = useState(0);

    function handleTouchStart(event: React.TouchEvent) {
        setTouchStart(event.touches[0].clientX);
        setTouchStartY(event.touches[0].clientY);
        setIsDragging(true);
    }

    function handleTouchMove(event: React.TouchEvent) {

        if (!isDragging) return;

        const currentX: number = event.touches[0].clientX;
        const currentY: number = event.touches[0].clientY;

        const differenceX: number = currentX - touchStart;
        const differenceY: number = currentY - touchStartY;

        // Отличаем вертикальное движение пальца от горизонтального свайпа.
        // Если вертикальное смещение больше горизонтального — пользователь прокручивает страницу,
        // поэтому отменяем свайп бригады.
        // Если горизонтальное смещение больше вертикального — продолжаем обработку свайпа.
        // Если смещения равны — условие не срабатывает, обработка свайпа продолжается.
        if (Math.abs(differenceY) > Math.abs(differenceX)) {
            setIsDragging(false);
            setDragOffset(0);
            return;
        }

        // Переменные и условие для
        // Эффекта сопротивления на краях списка
        // Если на первой бригаде и тянешь вправо смещение уменьшается в 3 раза.
        // Если на последней бригаде и тянешь влево смещение уменьшается в 3 раза.
        // Если находишься между бригадами смещение обычное.
        const isFirst: boolean = currentIndex === 0;
        const isLast: boolean = currentIndex === brigadesArr.length - 1;

        if ((isFirst && differenceX > 0) || (isLast && differenceX < 0)) {
            setDragOffset(differenceX / 3);
        } else {
            setDragOffset(differenceX);
        }
    }

    function handleTouchEnd() {

        if (!isDragging) return;

        setIsDragging(false);

        const threshold = 100;

        // Определяем, нужно ли переключить активную бригаду после завершения свайпа.
        // Если палец сместился влево дальше порогового значения и следующая бригада существует — переключаемся на неё.
        // Если палец сместился вправо дальше порогового значения и предыдущая бригада существует — переключаемся на неё.
        // Проверяем ID, чтобы не передать null в onBrigadeClick.
        if (dragOffset < -threshold && currentIndex < brigadesArr.length - 1) {
            const nextId = brigadesArr[currentIndex + 1].id;
            if (nextId !== null) setIsbrigadeSelectId(nextId);
        } else if (dragOffset > threshold && currentIndex > 0) {
            const prevId = brigadesArr[currentIndex - 1].id;
            if (prevId !== null) setIsbrigadeSelectId(prevId);
        }

        setDragOffset(0);
    }

    return {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        currentIndex,
        isbrigadeSelectId,
        setIsbrigadeSelectId
    };
}