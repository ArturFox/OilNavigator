import { Menu, Search } from "lucide-react";
import styles from './FiltersReplaceCoreStaff.module.scss';
import { ModalFactory } from "@/shared/ui/Modal/ModalFactory";
import { LayoutFactory } from "@/shared/ui/Layout/LayoutFactory";
import type { BaseFilters, FilterReplaceCoreStaffProps } from "@/shared/ui/Filters/FiltersReplace/FiltersReplaceCoreStaff/types/typesFiltersReplaceCoreStaff";

export function FilterReplaceCoreStaff<T extends BaseFilters> (
    {
        isOpenModalFilterReplaceCoreStaff,
        setIsOpenModalFilterReplaceCoreStaff,

        brigades,
        jobTitles,
        discharges,
        blocks,

        filters,
        setFilters,

        apply,
        reset

    }: FilterReplaceCoreStaffProps<T>
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
                        value={''}
                        
                    />
                </div>

                <button
                    className={styles["replaceWorkerFilters__button"]}
                    onClick={() => setIsOpenModalFilterReplaceCoreStaff(true)}
                >
                    <Menu className={styles["replaceWorkerFilters__button-icon"]} />

                    <span className={styles["replaceWorkerFilters__button-text"]}>
                        Фильтры
                    </span>

                </button>

            </article>

            {/* <article
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


            </article> */}

            {isOpenModalFilterReplaceCoreStaff && 

                LayoutFactory.layoutBottom({

                    isOpenModal: isOpenModalFilterReplaceCoreStaff,
                    onIsOpenModal: setIsOpenModalFilterReplaceCoreStaff,

                    children: ModalFactory.modalWorkerFilter({
                        filters,
                        setFilters,
                        brigades,
                        jobTitles,
                        blocks,
                        discharges,
                        apply,
                        reset
                    })

                })
            }

        </section>

    )

}