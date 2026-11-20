import type { ModalCreateBrigadeProps } from '@/shared/ui/Modal/ModalCreateAndDeleteBrigade/ModalCreateBrigade/types/typesModalCreateBrigade';
import styles from './ModalCreateBrigade.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ModalCreateBrigade(
    {
        onApply,
        isLoadingCreateNewBrigade
    }: ModalCreateBrigadeProps
) {
    const [cycleStartDate, onCycleStartDate] = useState<string>('');
    const [numberBrigade, onNumberBrigade] = useState<string>('');

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {

        if(!showToast){
            return
        }

        if(showToast && !cycleStartDate && !numberBrigade){

            toast.error('Заполните поля');

            setShowToast(false);
        } else if(showToast && !cycleStartDate){

            toast.error('Необходимо выбрать дату начала работы');

            setShowToast(false);
        } else if(showToast && !numberBrigade){

            toast.error('Необходимо дать номер бригаде');

            setShowToast(false);
        }

    }, [showToast])

    return (

        <>

            <h4 
                className={styles['title']}
            >
                Создать бригаду
            </h4>

            <input
                type="date"
                value={cycleStartDate}
                onChange={(event) => onCycleStartDate(event.target.value)}
                required
                className={styles['cycleStartDate']}
                placeholder='введите дату'
            />

            <input
                type="number"
                placeholder="Номер бригады"
                value={numberBrigade}
                onChange={(event) => onNumberBrigade(event.target.value)}
                required
                min={1}
                className={styles['numberBrigade']}
            />

            <button
                className={`
                    ${styles['apply']}
                    ${(cycleStartDate && numberBrigade) && styles['apply--active']}
                `}
                disabled={isLoadingCreateNewBrigade}
                onClick={() => {

                    if(isLoadingCreateNewBrigade) return

                    if (
                        !cycleStartDate ||
                        !numberBrigade
                    ) {
                        setShowToast(true);
                        return;
                    }

                    onApply({
                        cycleStartDate: cycleStartDate,
                        numberBrigade: Number(numberBrigade),
                    });
                }}
            >
                {isLoadingCreateNewBrigade ? 'Создание...' : 'Создать бригаду'}
            </button>

        </>

    );

}