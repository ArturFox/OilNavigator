import { X } from 'lucide-react';
import styles from '../CreateBrigadeModal.module.scss';
import type { CreateBrigadeDto } from '../../../entities/brigades/types/brigades.dto';

type NewUser = {
    name: string;
    installation_id: string;
    number_brigade: number | '';
}

interface Props {
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
    setBrigadeNumber: React.Dispatch<React.SetStateAction<number | ''>>;
    brigadeNumber: number | '';
    newUserSend: NewUser | null;
    createBrigade: (id: CreateBrigadeDto) => void;
}

export function CreateBrigadeModal ({setNewUser, setBrigadeNumber, brigadeNumber, newUserSend, createBrigade}: Props) {

    return (
        
        <>
            <button 
                className={styles['newUserX']}
                type="button"
                aria-label="Закрыть"
                onClick={() => setNewUser(false)}
            >
                <X
                    aria-hidden="true"
                />
            </button>

            <h4
                className={styles['newUserTitle']}
            >
                Введите номер бригады
            </h4>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!brigadeNumber || !newUserSend) return;
                    createBrigade({
                        name: newUserSend.name,
                        installation_id: newUserSend.installation_id,
                        number_brigade: brigadeNumber,
                    });
                    setNewUser(false);
                    setBrigadeNumber(''); 
                }}
                className={styles['newUserform']}
            >

                <div 
                    className={styles['newUserform__newUserNameAndInput']}
                >

                    <span
                        className={styles['newUserform__newUserNameAndInput__name']}
                    >
                        Бригада №
                    </span>

                    <input
                        type="number"
                        value={brigadeNumber}
                        onChange={(e) => setBrigadeNumber(Number(e.target.value))}
                        className={styles['newUserform__newUserNameAndInput__input']}
                    />

                </div>

                <div
                    className={styles['newUserform__newUserBlockButton']}
                >

                    <button 
                        className={styles['newUserform__newUserBlockButton__newUserButton']}
                        type="submit"
                    >
                        Создать
                    </button>

                </div>

            </form>

        </>

            
    )
}