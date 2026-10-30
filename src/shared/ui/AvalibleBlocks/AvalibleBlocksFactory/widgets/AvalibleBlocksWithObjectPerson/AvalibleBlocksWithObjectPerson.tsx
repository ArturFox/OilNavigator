import type { AvalibleBlocksWithObjectPersonProps } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/types/typesAvalibleBlocks";
import styles from './AvalibleBlocksWithObjectPerson.module.scss';

export function AvalibleBlocksWithObjectPerson (
    {
        he_can,
        personToReplace,
    }: AvalibleBlocksWithObjectPersonProps
) {

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

                    let blockSame: boolean;

                    if(personToReplace &&
                        personToReplace.he_can &&
                        personToReplace.he_can?.length > 0
                    ) {
                        let shortPersonToReplace = personToReplace.block.toLowerCase();
                        let shortPerson = block.toLowerCase();
                        blockSame = shortPersonToReplace === shortPerson;
                    } else {
                        blockSame = false;
                    }

                    return(

                        <span
                            className={`
                                ${styles["availableBlocks__heCan"]}
                                ${blockSame && styles["availableBlocks__heCan--good"]}    
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