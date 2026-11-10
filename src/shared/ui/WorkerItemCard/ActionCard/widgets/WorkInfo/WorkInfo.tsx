import styles from './WorkInfo.module.scss';

interface WorkInfoBaseProps {
    job_title: string;
    block: string;
    discharge: number;

    fontSizeJobAndBlockPx: number;
    fontSizeDischargePx: number;
    
    marginRightPx: number;

    gapPx: number;

    widthPercent: number;
}

export function WorkInfo(
    {
        job_title,
        block,
        discharge,
        fontSizeJobAndBlockPx,
        fontSizeDischargePx,
        marginRightPx,
        gapPx = 0,
        widthPercent
    }: WorkInfoBaseProps
){
    return (

        <div
            className={styles["status"]}
            style={{
                width: `${widthPercent}%`,
                marginRight: marginRightPx,
                gap: gapPx
            }}
        >

            <span
                className={styles["status__jobTitle"]}
                style={{fontSize: fontSizeJobAndBlockPx}}
            >
                {job_title} / {block}nbhbuhbuhvuhbuhuhvughv
            </span>

            <span
                className={styles["status__problem"]}
                style={{fontSize: fontSizeDischargePx}}
            >
                {discharge}njibnijbibihbihkkbijbibijbibbiubiubuibuibiu
            </span>

        </div>

    )
}