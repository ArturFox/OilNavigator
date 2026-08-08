import { ArrowDownWideNarrow, BadgeCheck, OctagonAlert } from 'lucide-react'
import styles from './SceletonAdmin.module.scss'

export function SceletonAdmin () {
    return(
    
            <main 
                className={styles["sceleton"]}
                aria-busy="true"
                aria-live="polite"
            >
                
                <section>
                    
                    <ul className={styles['calendar']}>

                        {Array.from({ length: 30 }, (_, index) => {

                            return (

                                <li
                                    key={index}
                                    className={styles["calendar__item"]}
                                >

                                    <span className={styles["calendar__dayOfWeek"]}>

                                        'Пн'
                                    
                                    </span>

                                    <button
                                        type='button'
                                        className={styles['calendar__button']}
                                    >

                                        <span 
                                            className={styles["calendar__day"]}
                                        >
                                            {index}
                                        </span>

                                        <span 
                                            className={styles["calendar__exclamation"]}
                                        >

                                            <OctagonAlert/>

                                        </span>
                                    
                                    </button>

                                </li>

                            )
                            
                        })}          

                    </ul>
    
                </section>
    
                <section className={styles["sceleton__changeShift"]}>
                
                    <button className={styles["sceleton__buttonChangeShift"]}>

                        <span className={styles["sceleton__buttonText"]}>
                            Все бригады
                        </span>
                    </button>
    
                </section>
    
                <section>
    
                    <ul className={styles["sceleton__dropdown"]}>
    
                        {Array.from({length: 3}, (_, index) => (

                            <li key={index}>

                                <article className={styles["sceleton__card"]}>

                                    <button className={styles["sceleton__cardButton"]}>

                                        <div className={styles["sceleton__viewTop"]}>

                                            <div className={styles["sceleton__viewFirstBlock"]}>

                                                <div className={styles["sceleton__viewTopIcone"]}>

                                                    <div className={styles["sceleton__viewTopIcone"]}/>

                                                </div>

                                                <div className={styles["sceleton__viewTopRighteBlock"]}>

                                                    <span className={styles["sceleton__viewTopRighteBlockGood"]}>

                                                        Бригада 1

                                                    </span>
                                                    
                                                    
                                                    <span className={styles["sceleton__viewTopRighteBlockGood"]}>
                                                        Проблем нет
                                                    </span>
                                                    

                                                </div>

                                            </div>

                                            <div 
                                                className={styles["sceleton__viewSecondBlock"]}
                                                aria-hidden="true"
                                            >

                                                <ArrowDownWideNarrow aria-hidden="true"/>

                                            </div>

                                        </div>

                                        <div className={styles["sceleton__russianDate"]}>
                                            <span className={styles["sceleton__russianDate--dateAndTime"]}>16.03.2025</span>
                                            <span className={styles["sceleton__russianDate--dateAndTime"]}>00:08 - 00:13</span>
                                        </div>

                                    </button>

                                </article>

                            </li>
                        ))}
    
                    </ul>
    
                </section>
    
            </main>
        )
}


 