import { ArrowBigUp } from 'lucide-react'
import styles from '../ShiftConstructor.module.scss'
import { DAYOFF, type DataType, type DayOffType } from '../../../shared/constants/shifts';

type DataTypeAll = DataType | DayOffType

interface Props {
    arrButtons: DataType[];
    arrShift: DataTypeAll[];
    setArrShift: React.Dispatch<React.SetStateAction<DataTypeAll[]>>;
}

export function ShiftConstructor ({arrButtons, arrShift, setArrShift}: Props) {

    return(
        <section className={styles['shift']}>

            <article className={styles['shift__arr']}>

                {arrShift.map((p, index) => (

                    <div 
                        key={index}
                        className={styles['shift__arr__block']}
                        style={{background: p.color}}
                    >

                        <span
                            className={styles['shift__arr__block__span']} 
                        >
                            {p.code}
                        </span>

                        <span
                            className={styles['shift__arr__block__span']} 
                        >
                            {p.label}
                        </span>

                    </div>
                ))}

            </article>

            <article className={styles['shift__icone']}>

                <span>

                    <ArrowBigUp
                        aria-hidden="true"
                    />

                </span>

                <span
                    className={styles['shift__icone__span']}
                >

                    Добавте смены
                
                </span>

            </article>

            <article className={styles['shift__buttons']}>

                {arrButtons.map((button) => (

                    <button 
                        key={button.id}
                        className={styles['shift__buttons__putButtonChange']} 
                        style={{background: button.color}}
                        onClick={() => setArrShift((prev) => [...prev, button])}
                        type="button"
                    >

                        <span
                            className={styles['shift__buttons__putButtonChange__span']}
                        >
                            {button.code}
                        </span>
                        
                        <span
                            className={styles['shift__buttons__putButtonChange__span']}
                        >
                            {button.label}
                        </span>

                    </button>

                ))}

                <button 
                    className={styles['shift__buttons__putButtonChange']}
                    style={{background: DAYOFF.color}}
                    onClick={() => setArrShift((prev) => [...prev, DAYOFF])}
                    type="button"
                >

                    <span
                        className={styles['shift__buttons__putButtonChange__span']} 
                    >
                        {DAYOFF.code}
                    </span>

                    <span
                        className={styles['shift__buttons__putButtonChange__span']}
                    >
                        {DAYOFF.label}
                    </span>

                </button>

            </article>

        </section>
    )
}