import type { AvalibleBlocksBaseProps } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/types/typesAvalibleBlocks"
import styles from './AvalibleBlocksBase.module.scss';

export function AvalibleBlocksBase (
    {
        he_can
    }: AvalibleBlocksBaseProps
){
    return (

        <div
            className={styles["availableBlocks"]}
        >

            <span
                className={styles["availableBlocks__heCanTitle"]}
            >
                Доп. блоки:
            </span>

            <div
                className={styles["availableBlocks__heCanBlock"]}
            >
                {he_can?.map((block) => {

                    return(

                        <span
                            className={`
                                ${styles["availableBlocks__heCan"]}    
                            `}
                        >

                            {block}
                            
                        </span>

                    )
                })}
            </div>

        </div>

    )

}