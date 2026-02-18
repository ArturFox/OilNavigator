/*src/components/todayBrigade.tsx*/



import { ArrowBigRightDash } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/new-store";
import styles from "../styles/blocks/today-brigade.module.scss";

export function TodayBrigade () {

  return (
      
    <article className={styles["today-brigade"]}>

      <div className={styles["today-brigade__header"]}>

        <div className={styles["today-brigade__icon"]}>
          <ArrowBigRightDash/>
        </div>

        <p className={styles["today-brigade__title"]}>
          Сейчас бригада {brigadeToday?.brigade}
        </p>

        <div className={styles["today-brigade__meta"]}>
          <div className={styles["today-brigade__meta-row"]}>
            <p className={styles["today-brigade__meta-text"]}>{brigadeToday?.label}</p>
            <p className={styles["today-brigade__meta-text"]}>{brigadeToday?.startDate}</p>
          </div>
        </div>

      </div>

      <div className={styles["today-brigade__divider"]}></div>

      <div className={styles["today-brigade__all"]}>
        {peopleToday?.map((person) => (
            <div
              className={styles["today-brigade__person"]}
              key={person.id}>

              <div className={styles["today-brigade__person-index"]}>
                {Number(person.id) + 1}
              </div>

              <div className={styles["today-brigade__person-content"]}>

                <div className={styles["today-brigade__person-row"]}>
                  
                  <div className={styles["today-brigade__person-text"]}>
                    {person.block}
                    </div>

                    <div className={styles["today-brigade__person-text"]}>
                      {person.jobTitle} {`${person.discharge} Разряд`}
                    </div>

                </div>

                <p className={styles["today-brigade__person-text"]}>
                  {person.surname} {person.name} {person.otherSurname}
                </p>

              </div>

            </div>
        ))}
      </div>

    </article>

  )
}