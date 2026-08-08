import { ArrowRightLeft, X } from 'lucide-react';
import type { BrigadesDto } from '../../../entities/brigades/types/brigades.dto';
import type { PersonsDto } from '../../../entities/persons/types/persons.dto';
import styles from '../PersonsEditor.module.scss';

interface PeopleButtonsProps {
    brigades: BrigadesDto[];
    currentButton: string;
    onSelectBrigade: (id: string) => void;
    selectedCrew: PersonsDto[] | [];
    deletF: (id:string) => void;
    clickChangePerson: (obj: PersonsDto) => void;
}

export function PersonsEditor ( {brigades, currentButton, onSelectBrigade, selectedCrew, deletF, clickChangePerson}: PeopleButtonsProps ) {


    return (

        <section className={styles['sectionPeople']}>

            <article className={styles['sectionPeople__article']}>

                <div className={styles['sectionPeople__article__buttons']}>

                    <button 
                        onClick={() => onSelectBrigade('no_brigade')}
                        className={`
                            ${styles['sectionPeople__article__buttons__button']}
                            ${currentButton === 'no_brigade' 
                                ? styles['sectionPeople__article__buttons__button--current']
                                : ''
                            }    
                        `}
                    >
                        Без бригады
                    </button>

                    {brigades.map((b) => (
                        
                        <button
                            key={b.id}
                            onClick={() => onSelectBrigade(b.id)}
                            className={`
                            ${styles['sectionPeople__article__buttons__button']}
                            ${currentButton === `${b.id}`
                                ? styles['sectionPeople__article__buttons__button--current']
                                : ''
                            }    
                        `}
                        >
                            {b.name}
                        </button>

                    ))}

                </div>

                <div 
                    className={`
                        ${styles['sectionPeople__article__block']}
                        ${selectedCrew.length === 0 
                            ? styles['sectionPeople__article__block--not']
                            : ''
                        }    
                    `}
                >
                    {selectedCrew.length > 0
                        ? (
                            selectedCrew.map((p) => (

                                <div 
                                    key={p.id}
                                    className={styles['sectionPeople__article__block__personsBlock']}
                                >
                                    
                                    <div
                                        className={styles['sectionPeople__article__block__personsBlock__info']}
                                    >
                                        <div
                                            className={styles['sectionPeople__article__block__personsBlock__info__name']}
                                        >
                                            <span>{p.surname}</span>
                                            <span>{p.name}</span>
                                            <span>{p.other_surname}</span>
                                        </div>

                                        <div
                                            className={styles['sectionPeople__article__block__personsBlock__info__discharge']}
                                        >
                                            <span>Разряд - {p.discharge}</span>
                                            <span>Блок - {p.block}</span>
                                        </div>

                                    </div>

                                    <div
                                        className={styles['sectionPeople__article__block__personsBlock__button']}
                                    >

                                        <button
                                            onClick={() => clickChangePerson(p)}
                                        >

                                            <ArrowRightLeft
                                                aria-hidden='true' 
                                                size={20}
                                            />

                                        </button>

                                        <button
                                            onClick={() => deletF(p.id)}
                                        >

                                            <X
                                                aria-hidden='true'
                                            />

                                        </button>

                                    </div>

                                </div>

                            ))
                        )
                        : < div 
                                className={styles['sectionPeople__article__block__notPersons']}
                            >
                                Нет сотрудников
                            </div>
                    }
                </div>
                
                

            </article>

        </section>
    )
}