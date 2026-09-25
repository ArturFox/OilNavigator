import { Factory } from "lucide-react";
import styles from "./LoadingPage.module.scss";

export function LoadingPage() {

  return (

    <main className={styles["loadingPage"]}>

      <div className={styles["loadingPage__content"]}>

        <div className={styles["loadingPage__logo"]}>
          <Factory/>
        </div>

        <h1 className={styles["loadingPage__title"]}>
          Добро пожаловать
        </h1>

        <div
          className={styles["loadingPage__loader"]}
          aria-label="Загрузка"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

      </div>

    </main>

  );

}
