import { type DataType } from '../../../shared/constants/shifts';
import styles from '../ShiftTimeEditor.module.scss'
import { Pen, X } from 'lucide-react';

interface ShiftTimeEditorProps {
    openWindow: (data: DataType) => void;
    setArrButtons: React.Dispatch<React.SetStateAction<DataType[]>>
    arrButtons: DataType[];
}

export function ShiftTimeEditor ({ openWindow, arrButtons, setArrButtons}:ShiftTimeEditorProps) {

    return(

        <section className={styles['sectionBase']}>

            <article className={styles['sectionBase__article']}>

                {arrButtons.map((button) => (
                    <div
                        key={button.id} 
                        className={styles['sectionBase__article__mainBlock']}
                    >

                        <button 
                            className={styles['sectionBase__article__mainBlock__button']}
                            onClick={() => openWindow(button)}
                        >

                            <div
                                className={styles['sectionBase__article__mainBlock__button__block']}
                            >

                                <span 
                                    className={styles['sectionBase__article__mainBlock__button__block__color']}
                                    style={{ background: button.color }}
                                >
                                    {button.label}
                                </span>

                                <span>
                                    {button.start_time}-{button.end_time}
                                </span>

                            </div>

                            <div 
                                className={`
                                    ${styles['sectionBase__article__mainBlock__button__timeM']}
                                `}
                            >
                                <Pen
                                    aria-hidden='true'
                                    size={20}
                                />
                            </div> 

                        </button>

                        <button
                            className={styles['sectionBase__article__mainBlock__delete']}
                            onClick={() => setArrButtons((prev) => prev.filter((buttonId) => buttonId.id !== button.id))}
                        >
                            <X/>
                        </button>

                    </div>

                    
                ))}

            </article>

        </section>
    )
}