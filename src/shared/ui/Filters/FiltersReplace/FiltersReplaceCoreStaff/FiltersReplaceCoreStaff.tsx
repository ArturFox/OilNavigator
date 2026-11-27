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
                        value={filters.searchUser}
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            searchUser: e.target.value
                        }))}
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