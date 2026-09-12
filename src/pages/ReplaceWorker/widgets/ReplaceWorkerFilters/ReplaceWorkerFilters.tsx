import { Menu, Search } from "lucide-react";
import styles from './ReplaceWorkerFilters.module.scss';
import type { Brigade } from "../../../../entities/brigades/types/brigades.dto";
import type { FilterSelected } from "../../types/typeReplaseWorker";

interface Props {
    inputText: string;
    onInputText: (value: string) => void;
    modal: boolean;
    onModal: (value: boolean) => void;
    filters: FilterSelected;
    brigadesArr: Brigade[];

}

export function ReplaceWorkerFilters (
    {
        inputText,
        onInputText,
        modal,
        onModal,
        filters,
        brigadesArr
    }: Props
) {

    return (

        <section
            className={styles["replaceWorkerFilters"]}
        >

            <article
                className={styles["replaceWorkerFilters__form"]}
            >

                <div
                    className={styles["replaceWorkerFilters__search"]}
                >
                    <div
                        className={styles["replaceWorkerFilters__search-icon"]}
                    >
                        <Search/>
                    </div>

                    <input
                        className={styles["replaceWorkerFilters__search-input"]}
                        placeholder='Поиск по ФИО'
                        value={inputText}
                        onChange={(e) => onInputText(e.target.value)}
                    />
                </div>

                <button
                    className={styles["replaceWorkerFilters__button"]}
                    onClick={() => onModal(!modal)}
                >
                    <Menu className={styles["replaceWorkerFilters__button-icon"]} />

                    <span className={styles["replaceWorkerFilters__button-text"]}>
                        Фильтры
                    </span>

                </button>

            </article>

            <article
                className={styles["replaceWorkerFilters__categories"]}
            >

                {Object.entries(filters).map(([key, value]) => {

                    if (!value || value.length === 0) return null;

                    if (key === 'brigadesId') {
                        
                        const selectedBrigades: Brigade[] = brigadesArr.filter((b) => value.includes(b.id))
                        
                        return (
                            
                            <div
                                className={styles["replaceWorkerFilters__categories-block"]}
                            >

                                {selectedBrigades.map((b) => (
                                    
                                    <span
                                        key={b.id}
                                        className={styles["replaceWorkerFilters__categories-button"]}
                                    >

                                        {b.name}

                                    </span>
                                ))}

                            </div>
                        )
                    }else {
                        return (
                            <div 
                                key={key}
                                className={styles["replaceWorkerFilters__categories-block"]}
                            >

                                {value.map((v: string | number) => (

                                    <span
                                        key={v}
                                        className={styles["replaceWorkerFilters__categories-button"]}
                                    >

                                        {v}

                                    </span>

                                ))}
                                
                            </div>
                        );
                    }
                })}


            </article>

        </section>

    )

}