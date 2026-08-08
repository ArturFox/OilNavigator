import { Plus, X } from 'lucide-react';
import styles from './CreateVacation.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { PersonsDto } from '../../entities/persons/types/persons.dto';
import { allBlocks, personsVacationMap } from '../../entities/persons/model/selectors/persons';
import { useGetBrigadesQuery } from '../../entities/brigades/api/getBrigades';
import { useGetPesonsQuery } from '../../entities/persons/api/getPersons';
import { ButtonCategoryDropdown } from '../../shared/ui/Button/ButtonCategoryDropdown/ButtonCategoryDropdown';
import { usePersonManagment } from '../../features/hooks/useButtonCategory';
import { brigadesMap } from '../../entities/brigades/model/selectors/brigades';
import type { BrigadesDto } from '../../entities/brigades/types/brigades.dto';

export function CreateVacation () {

    // Хуки
    const brigadesQuery = useGetBrigadesQuery();
    const peopleQuery = useGetPesonsQuery();

    // Данные из селекторов 
    const personsVacation: Map<string, PersonsDto[]> = useSelector(personsVacationMap);
    
    const [createVacantionNextYear, setCreateVacantionNextYear] = useState<boolean>(false);
    const [step, setStep] = useState<number>(4);
    const [stepCategory, onStepCategory] = useState<number>(1);


    const brigades: Map<string, BrigadesDto> = useSelector(brigadesMap);
    const blocks: string[] = useSelector(allBlocks);

    const tempWorkModes = [...brigades.values()].map(item => item.name);
    const blocksWorkMode = [...blocks].map((item) => item);
    console.log(blocksWorkMode)

    const {workModes} = usePersonManagment({
        howManyButtonsWillBe: 5,
        categoriesWorkModes: [
            ['Расп.', 'Отпуск'],
            ['Бригады', 'Блоки'],
            [blocksWorkMode],
        ],
    });

    if(brigadesQuery.isLoading || peopleQuery.isLoading){
        
        return (
            <div>
                Загрузка
            </div>
        )
    
    }

    const weekDays = [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
    ];

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

    const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();

    const emptyDays = Array.from({ length: firstDay }, () => ({
        empty: true,
        day: null,
        weekDay: null,
        dateRu: null,
    }));

    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
        const date = new Date(year, month, index + 1);
        const russianDate = date.toLocaleDateString('ru-Ru');

        return {
            empty: false,
            day: index + 1,
            weekDay: weekDays[date.getDay()],
            dateRu: russianDate,
        };
    });

    const arr = [...emptyDays, ...monthDays];

    const renderVacationPersons = (dateRu: string | null) => {

        if (!dateRu) {
            return null;
        }

        return personsVacation.get(dateRu)?.map((person) => {
            
            const nameShort = person.name.slice(0,2);
            const surnameShort = person.surname.slice(0,2);

            return (
                <div key={person.id}>
                    {nameShort}{surnameShort}
                </div>
            )
        });
    };

    const stepRef = useRef(step);
    const isModalOpenRef = useRef(createVacantionNextYear);

    useEffect(() => {
        stepRef.current = step;
        isModalOpenRef.current = createVacantionNextYear;
    }, [step, createVacantionNextYear]);

    
    useEffect(() => {

        const handlePopState = () => {

            if (!isModalOpenRef.current) return;

            const currentStep = stepRef.current;

            if (currentStep > 1) {
                setStep(currentStep - 1);
            } else {
                setCreateVacantionNextYear(false);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
        
    }, []);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
        window.history.pushState({ modalOpen: true }, '');
    };

    const handleCloseModal = () => {
        setCreateVacantionNextYear(false);
        setStep(1);
    };

    return (

        <main 
            className={styles['main']}
        >

            <section 
                className={styles['main__buttonss']}
            >

                <ButtonCategoryDropdown
                    nameButton="-"
                    myIndex={1}
                    workMode={workModes[0]}
                    stepCategory={stepCategory}
                    onStepCategory={onStepCategory}
                    onSelect={(value) => handleCategorySelect(0, value)}
                />

                <ButtonCategoryDropdown
                    nameButton="-"
                    workMode={workModes[1]}
                    myIndex={2}
                    stepCategory={stepCategory}
                    onStepCategory={onStepCategory}
                    onSelect={(value) => handleCategorySelect(1, value)}
                />

                <ButtonCategoryDropdown
                    nameButton="-"
                    workMode={workModes[2]}
                    myIndex={3}
                    stepCategory={stepCategory}
                    onStepCategory={onStepCategory}
                    onSelect={(value) => handleCategorySelect(2, value)}
                />

                <ButtonCategoryDropdown
                    nameButton="-"
                    workMode={workModes[3]}
                    myIndex={4}
                    stepCategory={stepCategory}
                    onStepCategory={onStepCategory}
                    onSelect={(value) => handleCategorySelect(3, value)}
                />

                <ButtonCategoryDropdown
                    nameButton="Применить"
                    workMode={workModes[4]}
                    myIndex={5}
                    stepCategory={stepCategory}
                    onStepCategory={onStepCategory}
                    onSelect={(value) => handleCategorySelect(4, value)}
                />               

            </section>

            <section className={styles['main__calendar']}>

                
                <article className={styles['main__calendar__week']}>

                    {weekDays.map((_, index) => (

                        <div 
                            key={index}
                            className={`
                                ${styles['main__calendar__week__dayWeek']}
                                ${ index === 5 || index === 6 
                                    ? styles['main__calendar__week__dayWeek--colorRed']  
                                    : ''
                                }
                            `}
                            
                        >
                            {weekDays[(index + 1) % 7]}
                        </div>

                    ))}

                </article>

                <article className={styles['main__calendar__days']}>

                    {arr.map((item, index) => (

                        <div 
                            key={index}
                            className={styles['main__calendar__days__day']}
                        >

                            <div
                                className={styles['main__calendar__days__day__numberDay']}
                            >
                                {item.day}
                            </div>

                            <div
                                className={styles['main__calendar__days__day__people']}
                            >
                                {renderVacationPersons(item.dateRu)}
                            </div>

                        </div>

                    ))}

                </article>

            </section>

            <section
                className={styles['main__annualLeave']}
            >
                
                <button
                    onClick={() => setCreateVacantionNextYear(!createVacantionNextYear)}
                    className={styles['main__annualLeave__button']}
                >
                    <Plus/>
                    Создать график отпусков на 2027 год
                </button>

                
                    <div 
                        className={`
                            ${styles['main__overlay']}
                            ${createVacantionNextYear 
                                ? styles['main__overlay_open'] 
                                : ''
                            }   
                        `}
                        onClick={() => setCreateVacantionNextYear(false)}
                    >

                        <div
                            className={styles['main__overlay__modalWindow']}
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div
                                className={styles['main__overlay__modalWindow__title']}
                            >
                                
                                <h3
                                    className={styles['main__overlay__modalWindow__title__text']}
                                >
                                    Создание графиков отпусков на 2026 год
                                </h3>
                                
                                <button
                                    onClick={() => handleCloseModal()}
                                    className={styles['main__overlay__modalWindow__title__close']}
                                >
                                    <X/>
                                </button>

                            </div>

                            <div 
                                className={styles['main__overlay__modalWindow__stepper']}
                            >

                                <div 
                                    className={`
                                        ${styles['main__overlay__modalWindow__stepper__item']} 
                                        ${step > 1 && styles['main__overlay__modalWindow__stepper__item--done']}
                                        ${step === 1 && styles['main__overlay__modalWindow__stepper__item--active']}
                                    `}
                                >

                                    <div 
                                        className={styles['main__overlay__modalWindow__stepper__item__circle']}
                                    >
                                        {step > 1 ? '✓' : '1'}
                                    </div>

                                    <span 
                                        className={styles['main__overlay__modalWindow__stepper__item__title']}
                                    >
                                        Настройки
                                    </span>

                                </div>

                                <div 
                                    className={`
                                        ${styles['main__overlay__modalWindow__stepper__item']} 
                                        ${step > 2 && styles['main__overlay__modalWindow__stepper__item--done']}
                                        ${step === 2 && styles['main__overlay__modalWindow__stepper__item--active']}
                                    `}
                                >

                                    <div 
                                        className={styles['main__overlay__modalWindow__stepper__item__circle']}
                                    >
                                        {step > 2 ? '✓' : '2'}
                                    </div>

                                    <span 
                                        className={styles['main__overlay__modalWindow__stepper__item__title']}
                                    >
                                        Сотрудники
                                    </span>

                                </div>

                                <div 
                                    className={`
                                        ${styles['main__overlay__modalWindow__stepper__item']} 
                                        ${step > 3 && styles['main__overlay__modalWindow__stepper__item--done']}
                                        ${step === 3 && styles['main__overlay__modalWindow__stepper__item--active']}
                                    `}
                                >

                                    <div 
                                        className={styles['main__overlay__modalWindow__stepper__item__circle']}
                                    >
                                        {step > 3 ? '✓' : '3'}
                                    </div>

                                    <span 
                                        className={styles['main__overlay__modalWindow__stepper__item__title']}
                                    >
                                        Проверка
                                    </span>

                                </div>


                                <div 
                                    className={`
                                        ${styles['main__overlay__modalWindow__stepper__item']} 
                                        ${step === 4 && styles['main__overlay__modalWindow__stepper__item--done']}
                                        ${step === 4 && styles['main__overlay__modalWindow__stepper__item--active']}
                                    `}
                                >

                                    <div 
                                        className={styles['main__overlay__modalWindow__stepper__item__circle']}
                                    >
                                        {step === 4 ? '✓' : '4'}
                                    </div>

                                    <span 
                                        className={styles['main__overlay__modalWindow__stepper__item__title']}
                                    >
                                        Готово
                                    </span>

                                </div>

                                
                            </div>

                            <div>
                                
                                <h3>Параметры графика</h3>


                            </div>
                            
                        </div>

                    </div>
                
            </section>
            
        </main>
    )
}