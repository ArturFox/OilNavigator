import { useDispatch, useSelector } from "react-redux"
import { setPesonFlag, type RootState } from "../store/new-store"
import styles from '../styles/blocks/info-about-person.module.scss'
import { useEffect } from "react";
import type { PersonsDto } from "../api/persons/persons.dto";

export function InfoAboutPerson () {

    const dispatch = useDispatch();

    const person: PersonsDto = useSelector((state: RootState) => state.date.person);

    useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
        document.body.style.overflow = "auto";
    };
}, []);


    function fn () {
        dispatch(setPesonFlag(false))
    }

    return(
        <section className={styles["section"]}>
            <div className={styles["section__modal"]}>

                <div className={styles["section__close"]} >

                    <div className={styles["section__profile"]} >

                        <div className={styles["section__profileText"]}>
                            <span>{person.name}</span>
                            <span>{person.surname}</span>
                            <span>{person.other_surname}</span>
                        </div>
                        

                    </div>

                    <button 
                        className={styles["section__closeButton"]} 
                        onClick={(e) => {
                        e.stopPropagation();
                        fn();

                    }}
                    >
                        x
                    </button>
                    
                </div>

                <div className={styles["section__topBlock"]}>

                    <div className={styles["section__block"]}>
                        <span>Должность</span>
                        <span>{person.job_title}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Блок</span>
                        <span>{person.block}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Разряд</span>
                        <span>{person.discharge}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Бригада</span>
                        <span>{person.brigade_name}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Отпуск</span>
                        <span>{person.vacation_start} - {person.vacation_end}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>ДP</span>
                        <span>{person.birthday}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Телефон</span>
                        <span>{person.phone_number}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}