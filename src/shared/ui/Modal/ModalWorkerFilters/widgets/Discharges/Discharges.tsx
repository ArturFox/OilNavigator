
import type { Dispatch, SetStateAction } from 'react';
import styles from './Discharges.module.scss';

interface BaseFilters {
    discharge: number[];
}

interface Props<T extends BaseFilters> {

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    discharges: number[];

}

export function Discharges<T extends BaseFilters>(
    {
        filters,
        setFilters,

        discharges

    }: Props<T>
) {

    const handleToggleDischarge = (discharge: number) => {

        setFilters((prev) => {

            const exists: boolean = prev.discharge.includes(discharge);

            return {

                ...prev,
                discharge: exists
                    ? prev.discharge.filter((item) => item !== discharge)
                    : [...prev.discharge, discharge],

            };

        });

    };

    return (

        <article
            className={styles["discharges"]}
        >

            <h4
                className={styles["discharges__title"]}
            >
                Разряд
            </h4>

            <div
                className={styles["discharges__listDischarges"]}
            >

                {discharges.map((discharge, index) => (

                    <button
                        key={index}
                        type="button"
                        className={`
                            ${styles["discharges__listDischarges-button"]}
                            ${filters.discharge.includes(discharge)
                                ? styles["discharges__listDischarges-button--pressed"]
                                : ''
                            }
                        `}
                        onClick={() => handleToggleDischarge(discharge)}
                    >

                        {discharge}

                    </button>

                ))}

            </div>

        </article>

    );

}
