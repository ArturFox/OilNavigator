import { X } from 'lucide-react';
import styles from './ButtonItemDeleteBrigade.module.scss';

interface Props {
    setIsDelete: (isDelete: boolean) => void;
}

export function ButtonItemDeleteBrigade (
    {
        setIsDelete
    }: Props
) {

    return (

        <li
            className={`
                ${styles['buttonItemDeleteBrigade']}
            `}
        >

            <button
                className={`
                    ${styles['buttonItemDeleteBrigade__button']}
                `}
                onClick={() => {
                    setIsDelete(true);
                }}
            >
                <X/>
            </button>

        </li>

    )
}