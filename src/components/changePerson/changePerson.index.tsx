import { useSelector } from 'react-redux';
import styles from '../../styles/blocks/changePerson.module.scss'
import type { RootState } from '../../store/new-store';
import { ArrowLeft, ArrowRightLeft } from 'lucide-react';
import type { PersonsDto } from '../../api/persons/persons.dto';
import type { BrigadesDto } from '../../api/brigades/brigades.dto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';


interface ChangePersonProps {
    personsMapProps: Map<string, PersonsDto[]>
    brigadesProps: Map<string,BrigadesDto>
}


export function ChangePerson ({personsMapProps, brigadesProps}: ChangePersonProps) {

    const navigate = useNavigate();

    const [selectedPerson, setSelectedPerson] = useState<PersonsDto | null>(null);    
    
    const person: PersonsDto = useSelector((state: RootState) => state.date.person);

    //const personHaveProblem = Boolean(person.sick_start || person.vacation_start);

    function goBack() {
        navigate(-1);
    }

    async function fnChange() {

        if (!selectedPerson) return;

        const serchPerson = supabase
        .from('persons')
        .select('*')
        .eq('id', person.id)
        .limit(1);

        const searchselectedPerson = supabase
        .from('persons')
        .select('*')
        .eq('id', selectedPerson?.id)
        .limit(1)

        const [serchPersonResult, searchselectedPersonResult] = 
            await Promise.all([serchPerson, searchselectedPerson]);

        if(serchPersonResult.error || searchselectedPersonResult.error){
            return
        }

        const addPerson = supabase
        .from('persons')
        .update({ brigade_id: person.brigade_id })
        .eq('id', selectedPerson.id);

        const deletPerson = supabase
        .from('persons')
        .update({ brigade_id: null })
        .eq('id', person.id);

        const [addPersonResult, deletPersonResult] = 
            await Promise.all([addPerson, deletPerson]);

        if (addPersonResult.error || deletPersonResult.error) {
            console.error('Ошибка при смене бригад', addPersonResult.error ?? deletPersonResult.error);
        } else {
            console.log('Бригады успешно изменены');
        }
        
    }

     return(
        <main className={styles["main"]}>
            
            <header className={styles["main__header"]}>
                <div onClick={() => goBack()}><ArrowLeft/></div>
            
                <button
                    onClick={() => fnChange()}
                >
                    Заменить
                </button>

            </header>

            <section className={styles["main__blockName"]}>

                <div className={styles["main__nameOne"]}>
                    {person.name} - {person.surname}
                </div>

                <div>
                    <ArrowRightLeft/>
                </div>

                <div className={styles["main__nameTwo"]}>
                    {selectedPerson ? `${selectedPerson.name} - ${selectedPerson.surname}` : "Добавьте замену"}
                </div>

            </section>

            <section className={styles["main__blockPersons"]}>

                <section className={styles["main__blockPersonsSections"]}>
                   <article
                        className={styles["main__blockPersonsArticle"]}
                   >
                        <h4
                            className={styles["main__blockPersonsH4"]}
                        >
                            Без бригады
                        </h4>

                        <div
                                className={styles["main__blockPersonsButton"]}
                            >
                                
                                {personsMapProps.get('no_brigade')?.map((p) => (
                                    <div className={styles["main__blockPersonsB"]}>
                                        <div
                                            key={p.id}
                                        >
                                            {p.name} - {p.surname}{" "}
                                            {p.sick_start && `Больничный`}
                                            {p.vacation_start && `Отпуск`}
                                        </div>

                                        <button 
                                            className={styles["main__blockPersonsAdd"]}
                                            onClick={() => setSelectedPerson(p)}    
                                        >
                                            Добавить
                                        </button>

                                    </div>
                                ))}
                                
                        </div>
                   </article>
                </section>

                <section className={styles["main__blockPersonsSections"]}>
                    {Array.from(brigadesProps.values()).map((b) => (
                        <article 
                            key={b.id}
                            className={styles["main__blockPersonsArticle"]}
                        >
                            <h4
                                className={styles["main__blockPersonsH4"]}
                            >
                                {b.name}
                            </h4>

                            <div
                                className={styles["main__blockPersonsButton"]}
                            >
                                
                                {personsMapProps.get(b.id)?.map((p) => (
                                    <div 
                                        className={styles["main__blockPersonsB"]}
                                    >
                                        <div
                                            key={p.id}
                                        >
                                            {p.name} - {p.surname}
                                        </div>

                                        <button 
                                            className={styles["main__blockPersonsAdd"]}
                                            onClick={() => setSelectedPerson(p)}
                                        >
                                            Добавить
                                        </button>

                                    </div>
                                ))}
                                
                            </div>
                        </article>
                    ))}
                </section>

            </section>
            
        </main>
    )
}