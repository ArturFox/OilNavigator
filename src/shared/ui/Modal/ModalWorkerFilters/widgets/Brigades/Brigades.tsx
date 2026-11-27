import type { Dispatch, SetStateAction } from 'react';
import styles from './Brigades.module.scss';

interface BaseFilters {
    brigadesId: (string | null)[];
}

interface Props<T extends BaseFilters> {

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    brigades: {
        id: string;
        name: string;
    }[];

}

export function Brigades<T extends BaseFilters> (
    {
        filters,
        setFilters,

        brigades

    }: Props<T>
) {

    const handleToggleBrigade = (brigadeId: string) => {

        setFilters((prev) => {

            const exists: boolean = prev.brigadesId.includes(brigadeId);

            return {

                ...prev,
                brigadesId: exists
                    ? prev.brigadesId.filter((id) => id !== brigadeId)
                    : [...prev.brigadesId, brigadeId],

            };

        });

    };

    return (

        <article 
            className={styles["brigades"]}
        >

            <h4 
                className={styles["brigades__title"]}
            >
                Бригады
            </h4>

            <div 
                className={styles["brigades__listBrigades"]}
            >

                {brigades.map((brigade) => (

                    <button
                        key={brigade.id}
                        type="button"
                        className={`
                            ${styles["brigades__listBrigades-button"]}
                            ${filters.brigadesId.includes(brigade.id)
                                ? styles["brigades__listBrigades-button--pressed"]
                                : ''
                            }
                        `}
                        onClick={() => handleToggleBrigade(brigade.id)}
                    >

                        {brigade.name}

                    </button>

                ))}

            </div>

        </article>

    )

}