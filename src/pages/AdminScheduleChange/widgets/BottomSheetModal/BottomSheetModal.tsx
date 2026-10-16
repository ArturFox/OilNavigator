import { X } from 'lucide-react';
import styles from './BottomSheetModal.module.scss';
import { useState } from 'react';
import { TitleH4 } from '../../../../shared/ui/Title/TitleH4/TitleH4';

export function BottomSheetModal () {

    const [createSchedule, onCreateSchedule] = useState<boolean>(false);

    const [touchStart, setTouchStart] = useState<number>(0);

    const [difference, onDifference] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [jittering, onJittering] = useState<boolean>(false)

    function handleTouchStart(event: React.TouchEvent) {

        setTouchStart(event.touches[0].clientY);

        onJittering(true);
    }

    function handleTouchMove(event: React.TouchEvent) {

        const currentY = event.touches[0].clientY;
        const difference = currentY - touchStart;

        if (isOpen) {

            const offset = Math.max(0, difference);

            onDifference(offset);

        } else {

            const offset = Math.min(0, difference);

            onDifference(offset);

        }
    }

    function handleTouchEnd() {

        onJittering(false);

        if (!isOpen && difference < -50) {
            setIsOpen(true);
        }

        if (isOpen && difference > 50) {
            setIsOpen(false);
        }

        onDifference(0);
    }

    const translateY = isOpen
    ? `${difference}px`
    : `70%`;

    return(

        <section
            className={`
                ${styles["createSchedule"]}
                ${jittering ? styles["createSchedule--jittering"] : ''}
            `}
            style={{
                transform: `translateY(${translateY})`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >

            <button
                className={styles["createSchedule__handle"]}
            />

            <div
                className={styles["createSchedule__title"]}
            >
                <TitleH4>
                    Составить расписание
                </TitleH4>
            </div>

            <button
                className={styles["createSchedule__listSchedule"]}
            >
                Составьте расписание
            </button>

            <div
                className={styles["createSchedule__scheduleOptions"]}
            >

                <div
                    className={styles["createSchedule__option"]}
                >

                    <button
                        className={styles["createSchedule__option-add"]}
                    >
                        
                        Для бригады
                        
                    </button>

                    <button
                        className={styles["createSchedule__option-delete"]}
                    >
                        <X/>
                    </button>

                </div>

                <div
                    className={styles["createSchedule__option"]}
                >

                    <button
                        className={styles["createSchedule__option-add"]}
                    >
                        Для бригады
                        

                    </button>

                    <button
                        className={styles["createSchedule__option-delete"]}
                    >
                        <X/>
                    </button>

                </div>

            </div>

        </section>

        
    )
}