import React, { useState } from "react";

interface UseSwipeProps {
    currentIndex: number;
    brigadeSortArr: { id: string }[];
    onBrigadeClick: (id: string) => void;
}

export function useSwipe({
    currentIndex,
    brigadeSortArr,
    onBrigadeClick,
}: UseSwipeProps) {

    const [touchStart, setTouchStart] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    function handleTouchStart(event: React.TouchEvent) {
        setTouchStart(event.touches[0].clientX);
        setTouchStartY(event.touches[0].clientY);
        setIsDragging(true);
    }

    function handleTouchMove(event: React.TouchEvent) {
        if (!isDragging) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        const differenceX = currentX - touchStart;
        const differenceY = currentY - touchStartY;

        if (Math.abs(differenceY) > Math.abs(differenceX)) {
            setIsDragging(false);
            setDragOffset(0);
            return;
        }

        const isFirst = currentIndex === 0;
        const isLast = currentIndex === brigadeSortArr.length - 1;

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

        if (dragOffset < -threshold && currentIndex < brigadeSortArr.length - 1) {
            onBrigadeClick(brigadeSortArr[currentIndex + 1].id);
        } else if (dragOffset > threshold && currentIndex > 0) {
            onBrigadeClick(brigadeSortArr[currentIndex - 1].id);
        }

        setDragOffset(0);
    }

    return {
        dragOffset,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
}