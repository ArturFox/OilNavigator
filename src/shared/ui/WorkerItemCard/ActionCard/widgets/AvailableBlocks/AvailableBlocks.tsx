import styles from './AvailableBlocks.module.scss';

export interface AvailableBlocksProps {
    he_can: string[] | null;

    fontSizeTitle: number;
    fontSizeBlocks: number;

    paddingTopPx?: number;
    paddingBottomPx?: number;
    paddingLeftPx?: number;
    paddingRightPx?: number;

    widthPercent: number;
}

export function AvailableBlocks (
    {
        he_can,
        fontSizeTitle,
        fontSizeBlocks,
        paddingTopPx = 0,
        paddingBottomPx = 0,
        paddingLeftPx = 0,
        paddingRightPx = 0,

        widthPercent
    }: AvailableBlocksProps
){
    return (

        <div
            className={styles["availableBlocks"]}
            style={{
                width: `${widthPercent}%`,
                paddingTop: paddingTopPx,
                paddingBottom: paddingBottomPx,
                paddingLeft: paddingLeftPx,
                paddingRight: paddingRightPx
            }}
        >

            <span
                className={styles["availableBlocks__heCanTitle"]}
                style={{fontSize: fontSizeTitle}}
            >
                Доп. блоки:bhbhbhj
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
                            style={{fontSize: fontSizeBlocks}}
                        >

                            {block}fffff
                            
                        </span>

                    )
                })}
            </div>

        </div>

    )

}