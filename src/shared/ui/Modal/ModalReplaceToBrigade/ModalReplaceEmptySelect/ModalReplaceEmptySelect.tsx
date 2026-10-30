import { useState } from 'react';
import styles from './ModalReplaceEmptySelect.module.scss';
import { ArrowRight } from 'lucide-react';
import type { ModalReplaceEmptySelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceEmptySelect/types/typesModalReplaceEmptySelect';

export function ModalReplaceEmptySelect<T, P>(
    {
        items,
        brigadeIdWhereEmptyCard,
        getItemLabel,
        getItemId,
        people,
        getPersonName,
        getPersonSurname,
    }: ModalReplaceEmptySelectProps<T, P>
) {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    const filteredItems = items.filter(
        (item) => getItemId(item) !== brigadeIdWhereEmptyCard
    );

    const activeLabel = selectedItem ? getItemLabel(selectedItem) : null;

    const selectedBrigadeId = selectedItem ? getItemId(selectedItem) : null;

    const selectedBrigadePeople: P[] = selectedBrigadeId !== null 
        ? people.get(String(selectedBrigadeId)) ?? [] 
        : [];

    return (
        <>
            <h4 className={styles['title']}>
                Выберите бригаду 
            </h4>

            <div className={styles['block']}>
                <h4 className={styles['block-titleLeft']}>
                    Выберите человека
                </h4>
                
                <div className={styles['block-iconeCenter']}>
                    <ArrowRight/>
                </div>

                <h4 className={`
                    ${styles['block-titleRight']}
                    ${activeLabel && styles['block-titleRight--active']}
                `}>
                    {activeLabel ? (
                        <span>{activeLabel}</span>
                    ) : (
                        <>
                            <span>Нету</span> 
                            <span>Человека</span>
                        </>
                    )}
                </h4>
            </div>

            {/* Список бригад */}
            <div className={styles['listBrigades']}>
                {filteredItems.map((item, index) => {
                    const id = getItemId(item);
                    const label = getItemLabel(item);

                    return (
                        <button
                            key={String(id) ?? index}
                            className={`
                                ${styles['listBrigades-button']}
                                ${selectedItem === item ? styles['listBrigades-button--active'] : ''}
                            `}
                            onClick={() => {
                                setSelectedItem((prev) => (prev === item ? null : item));
                            }}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Список людей выбранной бригады */}
            {selectedItem && (
                <div className={styles['peopleList']}>
                    {selectedBrigadePeople.length > 0 ? (
                        selectedBrigadePeople.map((person, index) => {
                            const name = getPersonName ? getPersonName(person) : '';
                            const surname = getPersonSurname ? getPersonSurname(person) : '';

                            return (
                                <div key={index} className={styles['peopleItem']}>
                                    <span>{surname} {name}</span>
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles['peopleEmpty']}>
                            В этой бригаде нет людей
                        </div>
                    )}
                </div>
            )}

            <button
                className={styles['apply']}
                disabled={selectedItem === null}
            >
                Применить
            </button>
        </>
    );
}