import { useEffect, type Dispatch, type SetStateAction } from 'react';
import styles from './Modal.module.scss';
import type { Brigade } from '../../../entities/brigades/types/brigades.dto';
import type { filterSelected } from '../../../pages/ReplaceWorker/ui/ReplaceWorker';

interface Props {
    modal: boolean;
    onModal: (modal: boolean) => void;
    brigadesArr: Brigade[];
    jobTitleArr: string[];
    blockArr: string[];
    dischargeArr: number[];
    filters: filterSelected;
    onFilters: Dispatch<SetStateAction<filterSelected>>;
    filterApply: boolean;
    onFilterApply: (filterApply: boolean) => void;
}

export function Modal ({
    modal, 
    onModal,  
    brigadesArr, 
    jobTitleArr,
    blockArr,
    dischargeArr,
    filters,
    onFilters,
    filterApply,
    onFilterApply
}: Props) {
    

    useEffect(() => {
        
        if(modal === false){
            return;
        }

        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = '';
        };

    }, [modal]);

    return(
        
        <div
            className={`
                ${styles["modal"]}
                ${modal === true && styles["modal--open"]}    
            `}
            onClick={() => onModal(!modal)}
        >

            <div
                className={`
                    ${styles['modal__main']}
                    ${modal && styles['modal__main--open']}    
                `}
                onClick={(event) => event?.stopPropagation()}
            >
                <div
                    className={styles["modal__categoryes"]}
                >

                    <h3
                        className={styles["modal__title"]}
                    >
                        Поиск по фильтрам
                    </h3>

                    <div
                        className={styles["modal__brigades"]}
                    >

                        <h4
                            className={styles["modal__brigadesTitle"]}
                        >
                            Бригады
                        </h4>

                        <div
                            className={styles["modal__brigadesList"]}
                        >
                            {brigadesArr.map((brigade) => (

                                <button
                                    key={brigade.id}
                                    className={`
                                        ${styles["modal__brigadesListButton"]}
                                        ${filters.brigadesId.includes((brigade.id))
                                            ? styles["modal__brigadesListButton--pressed"]
                                            : ''
                                        }    
                                    `}
                                    onClick={() =>
                                        onFilters((prev) => ({
                                            ...prev,
                                            brigadesId: prev.brigadesId.includes(brigade.id)
                                                ? prev.brigadesId.filter(
                                                    (brigadeId) => brigadeId !== brigade.id
                                                )
                                                : [...prev.brigadesId, brigade.id]
                                        }))
                                    }
                                >
                                    {brigade.name}
                                </button>
                            ))}

                        </div>

                    </div>

                    <div>

                        <h4
                            className={styles["modal__brigadesTitle"]}
                        >
                            Должность
                        </h4>

                        <div
                            className={styles["modal__brigadesList"]}
                        >
                            {jobTitleArr.map((jobTitle, index) => (

                                <button
                                    key={index}
                                    className={`
                                        ${styles["modal__brigadesListButton"]}
                                        ${filters.jobTitle.includes(jobTitle)
                                            ? styles["modal__brigadesListButton--pressed"]
                                            : ''
                                        }
                                    `}
                                    onClick={() => 
                                        onFilters((prev) => ({
                                            ...prev,
                                            jobTitle: prev.jobTitle.includes(jobTitle)
                                                ? prev.jobTitle.filter(
                                                    (job) => job !== jobTitle
                                                )
                                                : [...prev.jobTitle, jobTitle]
                                        }))
                                    }
                                >
                                    {jobTitle}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>

                        <h4
                            className={styles["modal__brigadesTitle"]}
                        >
                            Блок
                        </h4>

                        <div
                            className={styles["modal__brigadesList"]}
                        >
                            {blockArr.map((block, index) => (

                                <button
                                    key={index}
                                    className={`
                                        ${styles["modal__brigadesListButton"]}
                                        ${filters.block.includes(block) && styles["modal__brigadesListButton--pressed"]}
                                    `}
                                    onClick={() => 
                                        onFilters((prev) => ({
                                            ...prev,
                                            block: prev.block.includes(block)
                                                ? prev.block.filter((b) => b !== block)
                                                : [...prev.block, block]
                                        }))
                                    }
                                >
                                    {block}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>

                        <h4
                            className={styles["modal__brigadesTitle"]}
                        >
                            Разряд
                        </h4>

                        <div
                            className={styles["modal__brigadesList"]}
                        >
                            {dischargeArr.map((discharge, index) => (

                                <button
                                    key={index}
                                    className={`
                                        ${styles["modal__brigadesListButton"]}
                                        ${filters.discharge.includes(discharge)
                                            ? styles["modal__brigadesListButton--pressed"]
                                            : ''
                                        }
                                    `}
                                    onClick={() => 
                                        onFilters((prev) => ({
                                            ...prev,
                                            discharge: prev.discharge.includes(discharge)
                                                ? prev.discharge.filter((d) => d !== discharge)
                                                : [...prev.discharge, discharge]
                                        }))
                                    }
                                >
                                    {discharge}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>


                <button
                    className={styles["modal__apply"]}
                    onClick={() => {
                        onFilterApply(filterApply = true)
                        onModal(modal = false)
                    }}
                >
                    Применить
                </button>

                <button
                    className={styles["modal__cansel"]}
                    onClick={() => {
                        onFilters({
                            block: [],
                            brigadesId: [],
                            discharge: [],
                            jobTitle: []
                        })
                        onModal(modal = false)
                    }}
                >
                    Сбросить
                </button>
            </div>
        </div>
    )
}