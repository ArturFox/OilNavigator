import styles from './LayoutSimpleBlackBackground.module.scss';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { LayoutSimpleBlackBackgroundProps } from '@/shared/ui/Layout/LayoutSimpleBlackBackground/types/typesLayoutSimpleBlackBackground';

export function LayoutSimpleBlackBackground(
    {
        isLoading
    }: LayoutSimpleBlackBackgroundProps
){

    useEffect(() => {

        if (isLoading) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
        
    }, [isLoading])

    return createPortal (

        <div
            className={`
                ${styles['modal']}
                ${isLoading && styles['modal--open']}
            `}
        >

        </div>,

        document.body

    );

}