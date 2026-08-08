import { useState } from "react"
import styles from './ButtonCategoryDropdown.module.scss';

interface Props {
    nameButton: string;
    workMode?: string[];
    myIndex: number;
    stepCategory: number;
    onStepCategory: React.Dispatch<React.SetStateAction<number>>;
    onSelect?: (value: string) => void;
}

export function ButtonCategoryDropdown({
    nameButton,
    workMode,
    myIndex,
    stepCategory,
    onStepCategory,
    onSelect,
}: Props) {

    const [flagOpen, onFlagOpen] = useState(false);
    const [nameCategory, onNameCategory] = useState(nameButton);

    return (

        <div
            className={`
                ${styles.main}
                ${stepCategory >= myIndex
                    ? styles['main--active']
                    : styles['main--disable']}
            `}
        >

            <button
                disabled={stepCategory < myIndex}
                onClick={() => onFlagOpen(!flagOpen)}
                className={`
                    ${styles.main__buttonCategory}
                    ${stepCategory >= myIndex
                        ? styles['main__buttonCategory--active']
                        : styles['main__buttonCategory--disable']}
                `}
            >
                {nameCategory}
            </button>

            <div
                className={`
                    ${styles.main__categories}
                    ${flagOpen && styles.main__categories_active}
                `}
            >

                {workMode?.map((category) => (

                    <button
                        key={category}
                        className={styles.main__categories__buttonCategory}
                        onClick={() => {

                            onNameCategory(category);
                            onFlagOpen(false);

                            if (stepCategory === myIndex) {
                                onStepCategory(stepCategory + 1);
                            }

                            onSelect?.(category);

                        }}
                    >
                        <span
                            className={styles.main__categories__buttonCategory__text}
                        >
                            {category}
                        </span>

                    </button>

                ))}

            </div>

        </div>

    );
}