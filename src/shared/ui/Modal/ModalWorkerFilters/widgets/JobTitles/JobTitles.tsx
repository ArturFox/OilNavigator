import type { Dispatch, SetStateAction } from 'react';
import styles from './JobTitles.module.scss';

interface BaseFilters {
    jobTitle: string[];
}

interface Props<T extends BaseFilters> {

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    jobTitleNameProps: string[];

}

export function JobTitles<T extends BaseFilters> (
    {
        filters,
        setFilters,

        jobTitleNameProps

    }: Props<T>
) {

    const handleTogglejobTitle = (jobTitle: string) => {

        setFilters((prev) => {

            const exists: boolean = prev.jobTitle.includes(jobTitle);

            return {

                ...prev,
                jobTitle: exists
                    ? prev.jobTitle.filter((name) => name !== jobTitle)
                    : [...prev.jobTitle, jobTitle],

            };

        });

    };

    return (

        <article 
            className={styles["jobTitles"]}
        >

            <h4 
                className={styles["jobTitles__title"]}
            >
                Должность
            </h4>

            <div 
                className={styles["jobTitles__listJobTitles"]}
            >

                {jobTitleNameProps.map((jobTitle, index) => (

                    <button
                        key={index}
                        type="button"
                        className={`
                            ${styles["jobTitles__listJobTitles-button"]}
                            ${filters.jobTitle.includes(jobTitle)
                                ? styles["jobTitles__listJobTitles-button--pressed"]
                                : ''
                            }
                        `}
                        onClick={() => handleTogglejobTitle(jobTitle)}
                    >

                        {jobTitle}

                    </button>

                ))}

            </div>

        </article>

    )

}