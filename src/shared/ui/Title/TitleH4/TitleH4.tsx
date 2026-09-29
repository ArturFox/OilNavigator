import styles from './TitleH4.module.scss';

interface Props {
    children: React.ReactNode;
    disable?: boolean;
}

export function TitleH4 (
    {
        children,
        disable
    }:Props
) {

    return(

        <h4
            className={`
                ${styles['h4']} 
                ${disable ? styles['h4--disable'] : ''}
            `}
        >
            {children}
        </h4>
    )
}