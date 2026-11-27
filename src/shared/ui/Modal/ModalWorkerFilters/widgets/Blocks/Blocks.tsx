import type { Dispatch, SetStateAction } from 'react';
import styles from './Blocks.module.scss';

interface BaseFilters {
    block: string[];
}

interface Props<T extends BaseFilters> {

    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;

    blocks: string[];

}

export function Blocks<T extends BaseFilters>(
    {
        filters,
        setFilters,

        blocks

    }: Props<T>
) {

    const handleToggleBlock = (block: string) => {

        setFilters((prev) => {

            const exists: boolean = prev.block.includes(block);

            return {

                ...prev,
                block: exists
                    ? prev.block.filter((item) => item !== block)
                    : [...prev.block, block],

            };

        });

    };

    return (

        <article
            className={styles["blocks"]}
        >

            <h4
                className={styles["blocks__title"]}
            >
                Блок
            </h4>

            <div
                className={styles["blocks__listBlocks"]}
            >

                {blocks.map((block, index) => (

                    <button
                        key={index}
                        type="button"
                        className={`
                            ${styles["blocks__listBlocks-button"]}
                            ${filters.block.includes(block)
                                ? styles["blocks__listBlocks-button--pressed"]
                                : ''
                            }
                        `}
                        onClick={() => handleToggleBlock(block)}
                    >

                        {block}

                    </button>

                ))}

            </div>

        </article>

    );

}