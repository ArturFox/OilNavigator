import { Pen, Plus, X } from 'lucide-react';
import styles from '../BrigadeSelector.module.scss';
import type { BrigadesDto } from '../../../entities/brigades/types/brigades.dto';

interface BrigadeButtonsProps {
    brigades: BrigadesDto[];
    fnDiv: (brigade: BrigadesDto) => void;
    brigadeClick: string[];
    addDateBrigade: string[];
    dateInput: Record<string, string>;
    setDateInput: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    addDate: (drigade: BrigadesDto) => void;
    deleteBrigade: (id: string) => void;
    setNewUser: (v: boolean | ((prev: boolean) => boolean)) => void; 
}

export function BrigadeSelector ({brigades, fnDiv, brigadeClick, addDateBrigade, dateInput, setDateInput, addDate, deleteBrigade, setNewUser}: BrigadeButtonsProps) {

    return(

        <section 
            className={styles['sectionBrigades']}
        >

            <article 
                className={styles['sectionBrigades__article']}
            >

                <div 
                    className={styles['sectionBrigades__article__sectionBlock']}
                >

                    {brigades.map((brigade) => (
                        

                        <div
                            key={brigade.id} 
                            className={styles['sectionBrigades__article__sectionBlock__card']}
                        >
                            <div
                                role='button'
                                onClick={() => fnDiv(brigade)}
                                className={`
                                    ${styles['sectionBrigades__article__sectionBlock__card__block']}
                                    ${brigadeClick.includes(brigade.id) 
                                        ? styles['sectionBrigades__article__sectionBlock__card__block--active']
                                        : ''
                                    } 
                                `}
                            >

                                <span>
                                    {brigade.name}
                                </span>

                                {!brigadeClick.includes(brigade.id) && (

                                    <span
                                        className={styles['sectionBrigades__article__sectionBlock__card__block__pen']}
                                    >

                                        <Pen
                                            aria-hidden='true'
                                            size={20}
                                        />

                                    </span>

                                )}

                                {brigadeClick.includes(brigade.id) && (

                                    addDateBrigade.includes(brigade.id) 
                                        ? (
                                            <input
                                                onClick={(e) => e.stopPropagation()}
                                                type="date"
                                                className={styles['main__sectionBrigades__article__sectionBlock__card__block__input']}
                                                value={dateInput[brigade.id] || ""}
                                                onChange={(e) =>
                                                    setDateInput((prev) => ({
                                                        ...prev,
                                                        [brigade.id]: e.target.value,
                                                    }))
                                                }
                                            />
                                        )
                                        : (
                                            <button 
                                                className={styles['sectionBrigades__article__sectionBlock__card__block__button']}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    addDate(brigade)
                                                }}
                                            >
                                                Укажите первый день
                                            </button>
                                        )
                                    )
                                }

                            </div>

                            <button
                                className={styles['sectionBrigades__article__sectionBlock__card__X']}
                                type="button"
                                aria-label="Удалить бригаду"
                                onClick={() => deleteBrigade(brigade.id)}
                            >

                                <X
                                    aria-hidden='true'
                                />
                            </button>

                        </div> 

                        
                        
                    ))}

                </div>

                <button
                    type="button"
                    className={styles['sectionBrigades__article__newBrigade']}
                    onClick={() => setNewUser(prev => !prev)}
                >

                    <div 
                        className={styles['sectionBrigades__article__newBrigade__block']}
                    >

                        <span className={styles['sectionBrigades__article__newBrigade__block__span']}>
                            Добавить новую бригаду
                        </span>

                        <span
                            className={styles['sectionBrigades__article__newBrigade__block__span']}
                            aria-label="Кнопка добавить нового человека"
                        >
                            <Plus
                                aria-hidden="true"
                            />
                        </span>

                    </div>
                
                </button>

            </article>

        </section>

    )
}