import { Minus, Plus } from 'lucide-react';
import styles from './ModalSlideUp.module.scss';

interface Props {
    //userSelectButtons: Shift[];
    //onUserSelectButtons: React.Dispatch<React.SetStateAction<Shift[]>>;
}

export function ModalSlideUp (
    {
        
    }:Props
) {

    

    return(

        <div
            className={styles['modalWindowSlidingUpFromTheBottom']}
        >

            <section
                className={styles["modalWindowSlidingUpFromTheBottom__modal"]}
                onClick={(event) => event?.stopPropagation()}
            >

                <article
                    className={styles["modalWindowSlidingUpFromTheBottom__blockTitle"]}
                >
                    <h2
                        className={styles["modalWindowSlidingUpFromTheBottom__blockTitle-title"]}
                    >

                        Редактирование расписание

                    </h2>

                    <button
                        className={styles["modalWindowSlidingUpFromTheBottom__blockTitle-buttonSafe"]}
                    >
                        Сохранить
                    </button>

                </article>

                <article
                    className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete"]}
                >

                    <h3
                        className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-title"]}
                    >
                        10-дней в цикле
                    </h3>

                    <div
                        className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockButtons"]}
                    >

                        <button
                            className={`
                                ${styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockButtons-button"]}
                                ${styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockButtons-button--line"]}    
                            `}
                        >

                            <Minus/>

                        </button>

                        <button
                            className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockButtons-button"]}
                        >

                            <Plus/>

                        </button>

                    </div>

                </article>

                <article
                    className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockChangedShifts"]}
                >

                    {Array.from({length: 10}).map((_, index) => (

                        <button
                            key={index}
                            className={styles["modalWindowSlidingUpFromTheBottom__blockAddOrDelete-blockChangedShifts-buttonShift"]}
                        >
                            Ут
                        </button>
                    ))}
                    
                </article>

                
            </section>

        </div>
    )
}