import { useDispatch, useSelector } from "react-redux"
import { changePeson, type RootState } from "../store/new-store"
import type { Person } from "../types/schedule";
import styles from '../styles/blocks/info-about-person.module.scss'
import { useEffect } from "react";

export function InfoAboutPerson () {

    const dispatch = useDispatch();

    const person: Person = useSelector((state: RootState) => state.date.person);

    useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
        document.body.style.overflow = "auto";
    };
}, []);


    function fn () {
        dispatch(changePeson(false))
    }

    return(
        <section className={styles["section"]}>
            <div className={styles["section__modal"]}>

                <div className={styles["section__close"]} >

                    <div className={styles["section__profile"]} >

                        <span>{person.name}</span>
                        <span>{person.surname}</span>
                        <span>{person.otherSurname}</span>

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
                        <span>{person.jobTitle}</span>
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
                        <span>{person.brigade}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Отпуск</span>
                        <span>{person.vacationStart} - {person.vacationEnd}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>ДP</span>
                        <span>{person.birthday}</span>
                    </div>

                    <div className={styles["section__block"]}>
                        <span>Телефон</span>
                        <span>{person.phoneNumber}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}