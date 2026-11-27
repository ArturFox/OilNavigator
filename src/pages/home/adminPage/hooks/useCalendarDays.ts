import { changeDay } from "@/app/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    dateStore: string;
    stringRealDateToday: string;
    isLoading: boolean;
}

export function useCalendarDays(
    {
        isLoading,
        dateStore,
        stringRealDateToday
    }: Props
){

    const dispatch = useDispatch();

    const [isUserSelectDate, setIsUserSelectDate] = useState<string>('');
    
    const selectedDateRef = useRef<HTMLSpanElement | null>(null);

    const [, month] = stringRealDateToday.split('-').map(Number);
    const [, m] = dateStore.split('-').map(Number);

    useEffect(() => {

        if(m === month){

            setIsUserSelectDate(stringRealDateToday)
            dispatch(changeDay(stringRealDateToday))

        } else{

            setIsUserSelectDate(dateStore)

        }
        
    }, [month, m]);

    useEffect(() => {

        if (isLoading) return;

        selectedDateRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });

    }, [isLoading, isUserSelectDate]);

    const selectDate = (stringDate: string) => {

        dispatch(changeDay(stringDate));
        setIsUserSelectDate(stringDate);
        
    };

    return {
        isUserSelectDate,
        setIsUserSelectDate,
        selectedDateRef,
        selectDate
    };

}