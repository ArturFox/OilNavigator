import styles from './ModalWorkerFilters.module.scss';
import { Brigades } from '@/shared/ui/Modal/ModalWorkerFilters/widgets/Brigades/Brigades';
import { JobTitles } from '@/shared/ui/Modal/ModalWorkerFilters/widgets/JobTitles/JobTitles';
import { Discharges } from '@/shared/ui/Modal/ModalWorkerFilters/widgets/Discharges/Discharges';
import { Blocks } from '@/shared/ui/Modal/ModalWorkerFilters/widgets/Blocks/Blocks';
import type { BaseFilters, ModalWorkerFilterProps } from '@/shared/ui/Modal/ModalWorkerFilters/types/typesModalWorkerFilters';

export function ModalWorkerFilter<T extends BaseFilters>(

    {
        filters,
        setFilters,

        brigades,
        jobTitles,
        blocks,
        discharges,

        apply,
        reset

    }: ModalWorkerFilterProps<T>

) {

    return (

        <div
            className={styles['modal']}
            onClick={(event) => event.stopPropagation()}
        >

            <div className={styles["modal__categoryes"]}>

                <h3 className={styles["modal__categoryes-title"]}>
                    Поиск по фильтрам
                </h3>

                <Brigades
                    brigades={brigades}

                    filters={filters}
                    setFilters={setFilters}
                />

               
                <JobTitles
                    jobTitleNameProps={jobTitles}

                    filters={filters}
                    setFilters={setFilters}
                />

                <Blocks
                    filters={filters}
                    setFilters={setFilters}
                    blocks={blocks}
                />

                <Discharges
                    filters={filters}
                    setFilters={setFilters}
                    discharges={discharges}
                />

            </div>

            <button
                className={styles["modal__apply"]}
                onClick={apply}
            >
                Применить
            </button>

            <button
                className={styles["modal__cansel"]}
                onClick={reset}
            >
                Сбросить
            </button>

        </div>
    );
}