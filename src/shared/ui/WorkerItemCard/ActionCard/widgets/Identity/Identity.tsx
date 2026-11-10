import styles from './Identity.module.scss';

interface Props {
    name: string;
    surname: string;
    otherSurname: string;

    fontSizeNamePx: number;

    paddingTopPx?: number;
    paddingBottomPx?: number;
    paddingLeftPx?: number;
    paddingRightPx?: number;

    heightPx: number;
    widthPercent: number;

}

export function Identity (
    {
        name,
        surname,
        otherSurname,
        fontSizeNamePx,
        paddingTopPx = 0,
        paddingBottomPx = 0,
        paddingLeftPx = 0,
        paddingRightPx = 0,
        heightPx,
        widthPercent
    }: Props
) {

    return (
        <div
            className={styles["identity"]}
        >
            <span
                className={styles["identity__info"]}
                style={{
                    fontSize: fontSizeNamePx,
                    paddingTop: paddingTopPx,
                    paddingBottom: paddingBottomPx,
                    paddingLeft: paddingLeftPx,
                    paddingRight: paddingRightPx,
                    height: heightPx,
                    width: `${widthPercent}%`
                }}
            >
                {surname} {name} {otherSurname}
            </span>

        </div>
    )
}