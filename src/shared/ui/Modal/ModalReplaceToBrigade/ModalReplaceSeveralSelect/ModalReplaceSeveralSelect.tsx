import { useState } from 'react';
import styles from './ModalReplaceSeveralSelect.module.scss';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/shared/api/supabase/client';
import type { ModalReplaceSeveralSelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/type/typesModalReplaceSeveralSelect';

export function ModalReplaceSeveralSelect (
    {
        brigadesIdAndNumbers,
        arrSelectButton,
    }: ModalReplaceSeveralSelectProps
) {
    const [brigadeSelected, onBrigadeSelected] = useState<string | null>(null);
    const [isLoading, onIsLoading] = useState<boolean>(false);

    async function handleApply() {
        
        if (brigadeSelected === null) {
            toast.error('Выберите бригаду');
            return;
        }

        if (arrSelectButton.length === 0) {
            toast.error('Не выбраны сотрудники');
            return;
        }

        onIsLoading(true);

        const { error } = await supabase
            .from('persons')
            .update({ brigade_id: brigadeSelected })
            .in('id', arrSelectButton.map((person) => person.id));

        onIsLoading(false);

        if (error) {
            toast.error('Ошибка при изменении бригад', {
                description: error.message,
            });
            return;
        }

        toast.success('Бригады сотрудников успешно изменены');
    }

    return (
        <>
            <h4 className={styles['overlay__title']}>
                Выберите бригаду
            </h4>

            <div className={styles['overlay__blocks']}>
                {arrSelectButton.map((person) => (
                    <div
                        className={styles['overlay__block']}
                        key={person.id}
                    >
                        <div className={styles['overlay__block-nameInfo']}>
                            <span>{person.surname}</span>
                            <span>{person.name}</span>
                        </div>

                        <div className={styles['overlay__block-iconeRight']}>
                            <ArrowRight />
                        </div>

                        <div
                            className={`
                                ${styles['overlay__block-selectedBrigade']}
                                ${brigadeSelected !== null
                                    ? styles['overlay__block-selectedBrigade--active']
                                    : ''}
                            `}
                        >
                            {brigadeSelected !== null
                                ? <span>
                                    {brigadesIdAndNumbers.find(
                                        (brigade) => brigade.brigadeId === brigadeSelected
                                    )?.brigadeNumber}
                                </span>
                                : <>
                                    <span>Выберите</span>
                                    <span>бригаду</span>
                                </>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles['overlay__brigades']}>
                {brigadesIdAndNumbers.map((brigade) => (
                    <button
                        key={brigade.brigadeId}
                        className={`
                            ${styles['overlay__brigades-button']}
                            ${brigadeSelected === brigade.brigadeId
                                ? styles['overlay__brigades-button--active']
                                : ''}
                        `}
                        onClick={() => {
                            onBrigadeSelected((prev) =>
                                prev === brigade.brigadeId ? null : brigade.brigadeId
                            );
                        }}
                    >
                        {brigade.brigadeNumber}
                    </button>
                ))}
            </div>

            <button
                className={styles['overlay__apply']}
                onClick={handleApply}
                disabled={isLoading}
            >
                {isLoading ? 'Применение...' : 'Применить'}
            </button>
        </>
    );
}