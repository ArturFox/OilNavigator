import { ArrowRight, Menu, Plus, Search, User, X } from 'lucide-react';
import styles from './UserChange.module.scss';

export function UserChange () {

    return (

        <main
            className={styles["userChange"]}
        >
            
            <section
                className={styles["userChange__replacementProcess"]}
            >

                <article
                    className={styles["userChange__title"]}
                >

                    <button
                        className={styles["userChange__button"]}
                    >

                        <X/>

                    </button>

                    <div
                        className={styles["userChange__text"]}
                    >

                        <h3
                            className={styles["userChange__nameBrigade"]}
                        >
                            Замена в бригаде 5
                        </h3>

                        <p
                            className={styles["userChange__time"]}
                        >
                            10-03-2026 * 00:00-08:00
                        </p>

                    </div>

                </article>

                <article
                    className={styles["userChange__participants"]}
                >

                    <div
                        className={styles["userChange__participant"]}
                    >

                        <h4
                            className={styles["userChange__participantTitle"]}
                        >
                            Кого меняем
                        </h4>

                        <div
                            className={styles["userChange__infoUser"]}
                        >

                            <div
                                className={styles["userChange__iconeUser"]}
                            >
                                <User/>
                            </div>

                            <div
                                className={styles["userChange__textUser"]}
                            >

                                <span
                                    className={styles["userChange__name"]}
                                >
                                    Имя
                                </span>

                                <span
                                    className={styles["userChange__surname"]}
                                >
                                    Фамилия
                                </span>

                            </div>

                        </div>

                        <span
                            className={styles["userChange__problemUser"]}
                        >
                            Проблема
                        </span>

                    </div>

                    <div
                        className={styles["userChange__arrowRight"]}
                    >
                        <ArrowRight/>
                    </div>

                    <div
                        className={styles["userChange__participant"]}
                    >

                        <h4
                            className={styles["userChange__participantTitle"]}
                        >
                            На кого заменить?
                        </h4>

                        <div
                            className={styles["userChange__infoUser"]}
                        >

                            <div
                                className={styles["userChange__iconeUser"]}
                            >
                                <Plus/>
                            </div>

                            <div
                                className={styles["userChange__textUser"]}
                            >

                                <span
                                    className={styles["userChange__name"]}
                                >
                                    Выберите
                                </span>

                                <span
                                    className={styles["userChange__surname"]}
                                >
                                    Кандидата
                                </span>

                            </div>

                        </div>

                        <span
                            className={styles["userChange__problemUser"]}
                        >
                            Проблема
                        </span>

                    </div>

                </article>

            </section>

            <section>

                <article
                    className={styles["userChange__filters"]}
                >

                    <div
                        className={styles["userChange__search"]}
                    >
                        <div
                            className={styles["userChange__search-icon"]}
                        >
                            <Search/>
                        </div>

                        <input
                            className={styles["userChange__search-input"]}
                        />
                    </div>

                    <button
                        className={styles["userChange__buttonFilter"]}
                    >
                        <Menu className={styles["userChange__button-icon"]} />

                        <span className={styles["userChange__button-text"]}>
                            Фильтры
                        </span>

                    </button>

                </article>

            </section>

            <section
                className={styles["userChange__buttonsCategoryes"]}
            >

                <button
                    className={styles["userChange__buttonsCategoryes-button"]}
                >
                    Все
                </button>

                <button
                    className={styles["userChange__buttonsCategoryes-button"]}
                >
                    Все
                </button>

                <button
                    className={styles["userChange__buttonsCategoryes-button"]}
                >
                    Все
                </button>

                <button
                    className={styles["userChange__buttonsCategoryes-buttonReset"]}
                >
                    Сбросить
                </button>


            </section>

            <section
            >

                <ul
                    className={styles["userChange__peopleList"]}
                >

                    <li
                        className={styles["userChange__person"]}
                    >

                        <div
                            className={styles["userChange__person-block"]}
                        >

                            <div
                                className={styles["userChange__person-icone"]}
                            >
                                <User/>
                            </div>

                            <div
                                className={styles["userChange__person-info"]}
                            >
                                <span>Иванов Иван</span>
                                <span>Должность</span>
                                <span>Инфа</span>
                            </div>
                        </div>

                        <button
                            className={styles["userChange__person-button"]}
                        >
                            Выбрать
                        </button>

                    </li>

                </ul>

            </section>

        </main>
    )
}