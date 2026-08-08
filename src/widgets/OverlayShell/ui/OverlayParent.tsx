import styles from '../OverlayShell.module.scss';

interface Props {
    onClose: () => void;
    children: React.ReactNode;
    alignItems?: React.CSSProperties['alignItems'];
    padding?: React.CSSProperties['padding'];
    paddingLeft?: React.CSSProperties['paddingLeft'];
    paddingRight?: React.CSSProperties['paddingRight'];
    color?: React.CSSProperties['color'],
    borderRadius?: React.CSSProperties['borderRadius'],
    backgroundColor?: React.CSSProperties['backgroundColor'],
    display?: React.CSSProperties['display'],
    flexDirection?: React.CSSProperties['flexDirection'],
    width?: React.CSSProperties['width'],
    justifyContent?: React.CSSProperties['justifyContent'],
    height?: React.CSSProperties['height'],
    borderTopRightRadius?: React.CSSProperties['borderTopRightRadius'],
    borderTopLeftRadius?: React.CSSProperties['borderTopLeftRadius'],
}

export function OverlayParent({ 
    onClose, 
    children,
    
    display = 'flex',
    flexDirection = 'row',
    alignItems = 'center',
    justifyContent = 'center',

    padding = '0', 
    paddingLeft = '0px', 
    paddingRight = '0px',

    color = 'black',
    borderRadius,
    backgroundColor,
    width = '100%'
}: Props) {

    return (
        <div 
            className={styles['overlay']} 
            onClick={onClose}
            style={{
                display: display,
                flexDirection: flexDirection,
                alignItems: alignItems,
                justifyContent: justifyContent,
                padding: padding,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                color: color,
                borderRadius: borderRadius,
                backgroundColor: backgroundColor,
                width: width,
            }}
        >

            {children}
            
        </div>
    );
}