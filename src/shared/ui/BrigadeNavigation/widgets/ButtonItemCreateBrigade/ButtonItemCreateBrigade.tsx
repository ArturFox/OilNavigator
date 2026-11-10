import { Plus } from 'lucide-react';
import styles from './ButtonItemCreateBrigade.module.scss';

interface Props {
    setIsCreate: (isDelete: boolean) => void;
}

export function ButtonItemCreateBrigade (
    {
        setIsCreate
    }: Props
) {

    return (

        <li
            className={`
                ${styles['buttonItemCreateBrigade']}
            `}
        >

            <button
                className={`
                    ${styles['buttonItemCreateBrigade__button']}
                `}
                onClick={() => {
                    setIsCreate(true);
                }}
            >
                <Plus/>
            </button>

        </li>

    )
}