import type { ModalAddBrigadeProps } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalAddBrigade/types/typesModalAddBrigade';
import styles from './ModalAddBrigade.module.scss';
import { useState } from 'react';

export function ModalAddBrigade(
    {
        onApply,
        installation_id
    }: ModalAddBrigadeProps
) {
    const [cycle_start_date, onCycleStartDate] = useState<string>('');
    const [number_brigade, onNumberBrigade] = useState<string>('');

    return (
        <section className={styles['modalDeleteBrigade']}>

            <h4 className={styles['modalDeleteBrigade__title']}>
                Создать бригаду
            </h4>

            <input
                type="date"
                value={cycle_start_date}
                onChange={(event) => onCycleStartDate(event.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Номер бригады"
                value={number_brigade}
                onChange={(event) => onNumberBrigade(event.target.value)}
                required
                min={1}
            />

            <button
                className={styles['modalDeleteBrigade__bridadesList']}
                disabled={
                    !cycle_start_date ||
                    !number_brigade ||
                    Number(number_brigade) <= 0
                }
                onClick={() => {
                    onApply({
                        cycle_start_date,
                        installation_id,
                        number_brigade: Number(number_brigade),
                    });
                }}
            >
                Создать бригаду
            </button>

        </section>
    );
}